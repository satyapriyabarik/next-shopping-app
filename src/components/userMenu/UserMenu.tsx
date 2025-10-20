"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Dropdown } from "../common/Dropdown/Dropdown";
import { ToastProvider, useToast } from "../common/Toast/Toast";

function UserMenuInner() {
    const router = useRouter();
    const { user, initialized, fetchUser, logout } = useUserStore();
    const { addToast } = useToast();

    // ✅ Always run hooks (no early returns before hooks)
    useEffect(() => {
        if (!initialized) {
            fetchUser();
        }
    }, [initialized, fetchUser]);

    const handleLogout = async () => {
        await logout();
        addToast("Successfully logged out! Redirecting to login...", "success", 3000);
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    // ✅ UI rendering
    if (!initialized) {
        return <FaUser size={22} />;
    }

    return user ? (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                Welcome, {user.username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/profile" className="text-dark">My Profile</Dropdown.Item>
                <Dropdown.Item href="/orders" className="text-dark">My Orders</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-dark">Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ) : (
        <Link href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`} className="text-white" title="Login">
            <FaUser size={22} />
        </Link>
    );
}

// ✅ Wrap with ToastProvider
export default function UserMenu() {
    return (
        <ToastProvider position="top-center">
            <UserMenuInner />
        </ToastProvider>
    );
}

