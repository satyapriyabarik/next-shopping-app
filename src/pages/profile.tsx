import { Card } from '@/components/common/Card/Card';
import MainLayout from '@/components/layouts';
import React from 'react';

const ProfilePage: React.FC = () => {
    // Example user data
    const user = {
        name: 'Satya',
        email: 'satyapriya.barik@nagarro.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    return (
        <MainLayout title="Profile - GreenKart">
            <h2 className="text-center fw-bold text-success mb-4">
                🌱 Profile</h2>
            <Card className="p-4">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        style={{ width: 80, height: 80, borderRadius: '50%', marginRight: '1rem' }}
                    />
                    <div>
                        <h2 style={{ margin: 0 }}>{user.name}</h2>
                        <p style={{ margin: 0, color: '#555' }}>{user.email}</p>
                    </div>
                </div>
            </Card>
            {/* Add more profile details or actions here */}
        </MainLayout>
    );
};

export default ProfilePage;