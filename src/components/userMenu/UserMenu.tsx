"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import toast, { Toaster } from "react-hot-toast";
export default function UserMenu() {
    const router = useRouter();



    // if (!user) return null; // hide dropdown while redirecting
    // const { username, fetchUser, setUsername } = useUserStore();
    const { username, initialized, fetchUser, logout } = useUserStore();
    const handleLogout = async () => {
        await logout(); // clears store and calls /api/logout
        toast.success("Successfully logged out! Redirecting to login...");
        setTimeout(() => {
            router.push("/login");
        }, 2000); // redirect after toast
    };
    if (!initialized) return null;

    useEffect(() => {
        fetchUser();
    }, [fetchUser, username]);
    return (
        <> <Toaster position="top-center" reverseOrder={false} />
            {
                username ? (
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                            Welcome, {username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/account">My Profile</Dropdown.Item>
                            <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link href="/login" className="text-white" title="Login">
                        <FaUser size={22} />
                    </Link>
                )
            }
        </>
    );
}
