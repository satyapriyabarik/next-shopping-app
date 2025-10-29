import MainLayout from "@/components/layouts/MainLayout";
import CheckoutPage from "./checkout";

export default function CartPage() {
    return (
        <MainLayout title="Cart">
            <CheckoutPage />
        </MainLayout>
    );
}
