import { Card } from '@/components/common/Card/Card';
import MainLayout from '@/components/layouts';
import React from 'react';

const OrderPage: React.FC = () => {
    // Example user data
    const orders = [
        { id: 'ORD12345', date: '2025-06-01', total: 599.99, status: 'Delivered' },
        { id: 'ORD12346', date: '2025-10-31', total: 749.49, status: 'Processing' },
    ];

    return (
        <MainLayout title="Profile - GreenKart">
            <h2 className="text-center fw-bold text-success mb-4">
                🌱 Order History</h2>
            <Card className="p-4">
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>₹{order.total.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>
            {/* Add more profile details or actions here */}
        </MainLayout>
    );
};

export default OrderPage;