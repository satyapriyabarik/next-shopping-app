
"use client";

import React, { Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import UserMenu from "../userMenu/UserMenu";
import { NavBar } from "../common/NavBar/NavBar";
import { Badge } from "../common/Badge/Badge"; // Custom CSS module badge
import { LOGO_URL } from "@/constants/apiList";
import SearchBox from "./SearchBox";


export default function Header() {
    const pathname = usePathname();
    const cartCount = useCartStore((state) =>
        state.cart.reduce((sum, item) => sum + item.quantity, 0)
    );

    const isActive = (path: string) => pathname === path;

    return (
        <header className={"sticky-top shadow-sm"} style={{ position: "fixed", width: "100%", zIndex: 1000, top: 0 }}>
            <NavBar bg="dark" variant="dark" expand="lg" className="shadow-sm py-2 px-4">
                {/* Brand: Single Link */}
                <NavBar.Brand href="/">
                    <Image
                        src={LOGO_URL}
                        alt="GreenKart Logo"
                        width={45}
                        height={45}
                        className="me-2 rounded-circle bg-white p-1"
                    />
                    <span className="fs-4 fw-bold text-white">GreenKart</span>
                </NavBar.Brand>

                {/* Mobile toggle */}
                <NavBar.Toggle ariaControls="main-nav" />

                {/* Collapsible navigation */}
                <NavBar.Collapse id="main-nav">
                    {/* Left navigation links */}
                    <NavBar.Nav>
                        <NavBar.Nav.Link href="/" active={isActive("/")}>
                            Home
                        </NavBar.Nav.Link>
                        <NavBar.Nav.Link href="/products" active={isActive("/products")}>
                            Products
                        </NavBar.Nav.Link>
                        <NavBar.Nav.Link href="/about" active={isActive("/about")}>
                            About
                        </NavBar.Nav.Link>
                    </NavBar.Nav>

                    {/* Lazy-loaded search box */}
                    <Suspense fallback={<div className="text-white px-2">Loading search...</div>}>
                        <div className="flex-grow-1 me-2 d-flex justify-content-start px-4">
                            <SearchBox onSearch={(q, cat) => console.log("Search", q, cat)} />
                        </div>
                    </Suspense>
                </NavBar.Collapse>

                {/* Right-side user menu & cart */}
                <div className="d-flex align-items-center gap-3">
                    <UserMenu />

                    <Link href="/checkout" className="text-white position-relative" title="Shopping Cart">
                        <FaShoppingCart size={22} />
                        {cartCount > 0 && (
                            <Badge
                                bg="danger"
                                pill
                                className="position-absolute top-0 start-100 translate-middle"
                            >
                                {cartCount}
                            </Badge>
                        )}
                    </Link>
                </div>
            </NavBar>
        </header>
    );
}
