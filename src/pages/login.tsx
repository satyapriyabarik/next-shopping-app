"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { getErrorMessage } from "@/constants/errorMessages";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/common/Container/Container";
import { Alert } from "@/components/common/Alert/Alert";
import { Form } from "@/components/common/Form/Form";
import { Button } from "@/components/common/Button/Button";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { ToastProvider, useToast } from "@/components/common/Toast/Toast";
// ------------------ Zod schema ------------------
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// ------------------ LoginForm (inside ToastProvider) ------------------
const LoginForm: React.FC<{ csrf: string | null }> = ({ csrf }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { setUsername } = useUserStore();
    const { addToast, removeToast } = useToast(); // ✅ safe here

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        setError(null);

        const toastId = addToast("Signing in...", "loading", 0, "top-center");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": csrf ?? "",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            removeToast(toastId);

            if (res.status === 200) {
                const respData = await res.json();
                setUsername(respData.username);
                addToast("Login successful!", "success", 3000);
                const redirectTo = searchParams.get("redirect") || "/";
                setTimeout(() => {
                    if (redirectTo) router.push(redirectTo);
                    else router.back();
                }, 2000);
            } else {
                const message = getErrorMessage(res.status) || "Login failed";
                setError(message);
                addToast(message, "error", 3000, "top-center");
            }
        } catch (err: Error | unknown) {
            removeToast(toastId);
            const msg = "Network error: " + (err instanceof Error ? err.message : 'Unknown error');
            setError(msg);
            addToast(msg, "error", 3000, "top-center");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ maxWidth: 720 }} className="py-5 bg-light rounded">
            <h2 className="text-center fw-bold text-success mb-4">🌱 Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Username */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        id="username"
                        type="text"
                        {...register("username")}
                        aria-invalid={!!errors.username}
                        aria-describedby="username-error"
                        disabled={loading}
                    />
                    {errors.username && (
                        <div id="username-error" role="alert" className="text-danger mt-1">
                            {errors.username.message}
                        </div>
                    )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        {...register("password")}
                        aria-invalid={!!errors.password}
                        aria-describedby="password-error"
                        disabled={loading}
                    />
                    {errors.password && (
                        <div id="password-error" role="alert" className="text-danger mt-1">
                            {errors.password.message}
                        </div>
                    )}
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button type="submit" disabled={loading || !isValid} variant="success">
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

// ------------------ LoginPage ------------------
export default function LoginPage() {
    const [csrf, setCsrf] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/csrf", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setCsrf(data.csrfToken))
            .catch(() => { });
    }, []);

    return (
        <MainLayout title="Login">
            <ToastProvider position="top-center">
                <LoginForm csrf={csrf} />
            </ToastProvider>
        </MainLayout>
    );
}
