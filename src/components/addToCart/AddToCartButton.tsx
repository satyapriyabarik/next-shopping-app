
"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/Product";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "../common/Button/Button";
import { flyToCart } from "@/utils/flyToCart";

interface AddToCartButtonProps {
    product: Product;
    imageSelector?: string; // optional CSS selector for the image
}

export default function AddToCartButton({ product, imageSelector }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        // ✅ Update cart store
        addToCart(product);

        // ✅ Find image element (by selector or alt)
        const imgEl = imageSelector
            ? document.querySelector(imageSelector)
            : document.querySelector(`img[alt="${product.name}"]`);

        // ✅ Find cart icon
        const cartIcon = document.querySelector("a[title='Shopping Cart']");

        // ✅ Animate only if both are valid elements
        if (imgEl instanceof HTMLImageElement && cartIcon instanceof HTMLElement) {
            flyToCart(imgEl, cartIcon);
        }
    };

    return (
        <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            aria-label="Add to Cart"
        >
            <FaCartPlus />
            Add to Cart
        </Button>
    );
}
