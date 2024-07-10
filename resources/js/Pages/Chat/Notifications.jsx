import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, mentionedMessages }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Notifications" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                            <ul>
                                {mentionedMessages.map((message) => (
                                    <li key={message.id} className="mb-4">
                                        <div className="bg-gray-100 p-4 rounded">
                                            <p><strong>{message.user.user_name}</strong> mentioned you in <strong>{message.conversation.name}</strong></p>
                                            <p className="mt-2">{message.message}</p>
                                            <p className="text-sm text-gray-500">{message.created_at ? new Date(message.created_at).toLocaleString() :  new Date().toLocaleString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
