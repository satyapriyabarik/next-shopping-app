import MainLayout from '@/components/layouts';
import { useUserStore } from '@/store/useUserStore';
import { Card } from '@greenkart/storybook-ui';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ProfilePage: React.FC = () => {
    // Example user data
    // const user = {
    //     name: 'Satya',
    //     email: 'satyapriya.barik@nagarro.com',
    //     avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGFds5_OPnKAw/profile-displayphoto-shrink_400_400/B56ZWEvJ5wGQAo-/0/1741688709508?e=1762387200&v=beta&t=GzimUPBmv6f3HlhkgE6LI9fsK9KcDX5jEyWNg5j0VXg',
    // };
    const { user, initialized, fetchUser } = useUserStore();
    useEffect(() => {
        if (!initialized) fetchUser();
    }, [initialized, fetchUser]);
    return (
        user ? <MainLayout title="Profile - GreenKart">
            <h2 className="text-center fw-bold text-success mb-4">
                🌱 Profile</h2>
            <Card className="p-4">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        style={{ borderRadius: '50%', marginRight: '1rem' }}
                        height={80} width={80}
                    />
                    <div>
                        <h2 style={{ margin: 0 }}> {user.username}</h2>
                        <p style={{ margin: 0, color: '#555' }}>Email: {user.email}</p>
                        <p style={{ margin: 0, color: '#555' }}>Role: {user.role}</p>
                        <p style={{ margin: 0, color: '#555' }}>Base Location: {user.base_location}</p>

                    </div>
                </div>
            </Card>
            {/* Add more profile details or actions here */}
        </MainLayout > : <MainLayout title="Profile - GreenKart">Please Login to view profile</MainLayout>
    );
};

export default ProfilePage;