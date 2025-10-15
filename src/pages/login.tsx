

"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { getErrorMessage } from "@/constants/errorMessages";
import toast, { Toaster } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------ Zod schema ------------------
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// ------------------ LoginPage ------------------
export default function LoginPage() {
    const router = useRouter();
    const { setUsername } = useUserStore();

    const [csrf, setCsrf] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ------------------ React Hook Form ------------------
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: "onChange", // live validation for button state
    });

    useEffect(() => {
        fetch("/api/csrf", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setCsrf(data.csrfToken))
            .catch(() => { });
    }, []);

    // ------------------ Submit Handler ------------------
    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        setError(null);

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

            if (res.status === 200) {
                const respData = await res.json();
                setUsername(respData.username);
                toast.success("Login successful!");
                router.push("/");
            } else {
                const message = getErrorMessage(res.status);
                setError(message || "Login failed");
            }
        } catch (err: any) {
            setError("Network error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout title="Login">
            <Toaster position="top-center" />
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
                            <div
                                id="username-error"
                                role="alert"
                                className="text-danger mt-1"
                            >
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
                            <div
                                id="password-error"
                                role="alert"
                                className="text-danger mt-1"
                            >
                                {errors.password.message}
                            </div>
                        )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button type="submit" disabled={loading || !isValid} className="btn-success">
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
        </MainLayout>
    );
}
