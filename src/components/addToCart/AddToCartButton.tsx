
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/Product";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "../common/Button/Button";

export default function AddToCartButton({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Button
            variant="success"
            size="sm"
            onClick={() => addToCart(product)}
            aria-label="Add to Cart"
        >
            <FaCartPlus /> Add to Cart
        </Button>
    );
}
