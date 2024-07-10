import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function RoomsIndex({ auth, users }) {
    const user = usePage().props.auth.user;
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">People</h2>}
        >
            <Head title="People"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">User List</h1>
                            <div className="flex flex-wrap gap-4">
                                {users.map((user, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-full border border-gray-300"
                                        style={{
                                            backgroundColor: '#f9f9f9', 
                                            color: getRandomColor(),
                                            minWidth: '150px', 
                                            textAlign: 'center', 
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <div className="relative mr-3">
                                            <img
                                                id="preview"
                                                src={user.icon_path ? user.icon_path : '/images/default-user_icon.webp'}
                                                alt="Profile Picture"
                                                className="w-20 h-20 rounded-full object-cover border-none bg-gray-200"
                                            />
                                            <span
                                                className="absolute bottom-0 right-0 w-4 h-4 rounded-full"
                                                style={{
                                                    color: user.logincheck === 1 ? 'green' : 'red',
                                                }}
                                            >
                                                {user.logincheck === 1 ? 'online' : 'offline' }
                                            </span>
                                        </div>
                                        Name: {user.user_name} <br/>
                                        Department: {user.department ? user.department.name : 'N/A'}<br/>
                                        Faculty: {user.faculty ? user.faculty.name : 'N/A'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}