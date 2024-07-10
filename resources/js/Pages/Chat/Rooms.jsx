import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function RoomsIndex({ auth, conversations }) {
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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Rooms</h2>}
        >
            <Head title="Rooms"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">Your Conversations</h1>
                            <div className="flex flex-wrap gap-4">
                                {conversations.map((conversation, index) => (
                                    <Link
                                        href={route('chat.index', { conversation: conversation.id })}
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
                                        {conversation.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}