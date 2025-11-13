"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import UserMenu from "../userMenu/UserMenu";
import { BASE_URL, LOGO_URL } from "@/constants/apiList";
import { Badge, NavBar, SearchBox } from "@greenkart/storybook-ui";
import { Product } from "@/types/Product";

// Match SearchBox’s expected product type
interface SearchProduct {
    id: string;
    name: string;
    category: string;
}

/** 🔍 Fetch search results from JSON placeholder dataset */
const fetchProducts = async (query: string, category: string): Promise<SearchProduct[]> => {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch data");

        const all: Product[] = await res.json();

        // Filter by query
        let filtered = all.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        );

        // Apply category filter (if not "All")
        if (category !== "All") {
            filtered = filtered.filter((p) => p.category === category);
        }

        // Simulate delay for UX
        await new Promise((r) => setTimeout(r, 300));

        // Map & normalize types (convert id to string)
        return filtered.slice(0, 10).map((p) => ({
            id: String(p.id),
            name: p.name,
            category: p.category,
        }));
    } catch (err) {
        console.error("Error fetching products:", err);
        return [];
    }
};

export default function Header() {
    const pathname = usePathname();
    const [categories, setCategories] = useState<string[]>(["All"]);

    const cartCount = useCartStore((state) =>
        state.cart.reduce((sum, item) => sum + item.quantity, 0)
    );

    const isActive = (path: string) => pathname === path;

    // 🧠 Load unique categories dynamically from API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch(BASE_URL);
                const data: Product[] = await res.json();

                const uniqueCategories = Array.from(
                    new Set(data.map((item) => item.category))
                ) as string[];

                setCategories(["All", ...uniqueCategories]);
            } catch (err) {
                console.error("Error loading categories:", err);
                setCategories(["All"]);
            }
        };

        loadCategories();
    }, []);

    // Triggered during typing
    const handleFetchResults = async (query: string, category: string) => {
        return await fetchProducts(query, category);
    };

    // Triggered on explicit search
    const handleSearch = (query: string, category: string) => {
        console.log("🔍 Search submitted:", { query, category });
    };

    return (
        <header
            className="sticky-top shadow-sm"
            style={{ position: "fixed", width: "100%", zIndex: 1000, top: 0 }}
        >
            <NavBar bg="dark" variant="dark" expand="lg" className="shadow-sm py-2 px-4">
                {/* 🪴 Brand / Logo */}
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

                {/* 📱 Mobile Toggle */}
                <NavBar.Toggle ariaControls="main-nav" />

                {/* 🌿 Main Nav */}
                <NavBar.Collapse id="main-nav">
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

                    {/* 🔍 Dynamic SearchBox */}
                    <Suspense fallback={<div className="text-white px-2">Loading search...</div>}>
                        <div className="flex-grow-1 me-2 d-flex justify-content-start px-4">
                            <SearchBox
                                categories={categories}
                                onSearch={handleSearch}
                                onFetchResults={handleFetchResults}
                            />
                        </div>
                    </Suspense>
                </NavBar.Collapse>

                {/* 🛒 Cart & User Menu */}
                <div className="d-flex align-items-center gap-3">
                    <UserMenu />
                    <Link
                        href="/checkout"
                        className="text-white position-relative"
                        title="Shopping Cart"
                    >
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
