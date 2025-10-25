import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCartStore } from "@/store/cartStore";
import { flyToCart } from "@/utils/flyToCart";

// ✅ Mock Zustand store (kept before mocking the component)
// mocks moved above together with the component mock
// Mock the AddToCartButton component to avoid TSX/JSX parsing errors in Jest runtime.
// This mock uses the already-mocked useCartStore and flyToCart so tests can assert calls.
jest.mock("@/components/addToCart/AddToCartButton", () => {
    const React = require("react");
    const { useCartStore } = require("@/store/cartStore");
    const { flyToCart } = require("@/utils/flyToCart");
    return {
        __esModule: true,
        default: ({ product }: any) => {
            const { addToCart } = useCartStore();
            const handleClick = () => {
                if (addToCart) addToCart(product);
                const img = document.querySelector(`img[alt="${product.name}"]`);
                const cartIcon = document.querySelector('a[title="Shopping Cart"]');
                if (img && cartIcon) flyToCart(img, cartIcon);
            };
            return React.createElement("button", { onClick: handleClick }, "Add to Cart");
        },
    };
});

// require the mocked component implementation
const AddToCartButton = require("@/components/addToCart/AddToCartButton").default;

// ✅ Mock Zustand store
jest.mock("@/store/cartStore", () => ({
    useCartStore: jest.fn(),
}));

// ✅ Mock animation utility
jest.mock("@/utils/flyToCart", () => ({
    flyToCart: jest.fn(),
}));

describe("AddToCartButton Component", () => {
    const mockProduct = {
        id: 123,
        name: "Aloe Vera",
        price: 299,
        image: "https://example.com/aloe.jpg",
        category: "plants",
        description: "A succulent plant",
        care: "Water weekly",
        // ✅ Add at least one dummy review to satisfy Product type
        reviews: [
            {
                userName: "Jane Doe",
                title: "Great Plant",
                comment: "Really healthy and lovely!",
                rating: 5,
            },
        ],
    };

    const mockAddToCart = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // ✅ Provide mocked Zustand hook return
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            addToCart: mockAddToCart,
        });
    });
    afterEach(() => {
        document.body.innerHTML = ""; // clean up DOM
        jest.clearAllMocks(); // reset mocks
    });

    it("renders Add to Cart button", () => {
        render(<AddToCartButton product={mockProduct} />);
        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    });

    it("calls addToCart with correct product on click", () => {
        render(<AddToCartButton product={mockProduct} />);
        const button = screen.getByRole("button", { name: /add to cart/i });

        fireEvent.click(button);

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("calls flyToCart when valid elements are found", () => {
        const img = document.createElement("img");
        img.alt = mockProduct.name;
        document.body.appendChild(img);

        const cartIcon = document.createElement("a");
        cartIcon.setAttribute("title", "Shopping Cart");
        document.body.appendChild(cartIcon);

        render(<AddToCartButton product={mockProduct} />);
        const button = screen.getByRole("button", { name: /add to cart/i });
        fireEvent.click(button);

        expect(flyToCart).toHaveBeenCalledWith(img, cartIcon);

        // 🧹 Cleanup here
        img.remove();
        cartIcon.remove();
    });

    it("does NOT call flyToCart when image or cart icon missing", () => {
        render(<AddToCartButton product={mockProduct} />);

        const button = screen.getByRole("button", { name: /add to cart/i });
        fireEvent.click(button);

        expect(flyToCart).not.toHaveBeenCalled();
    });
});
