import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, mentionedMessages }) {
    const [messages, setMessages] = useState(mentionedMessages);
    
    const markAsRead = async (id) => {
        try {
            await axios.post(route('notifications.read', { id }));
            setMessages(messages.map(message => 
                message.id === id ? { ...message, is_read: true } : message
            ));
            console.log(messages);
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };
    
    // const getNotifications = async () => {
    //     try {
    //         const res = await axios.get(route('notifications.index'));
    //         setMessages(res.data.mentionedMessages);
    //     } catch (error) {
    //         console.error('Error fetching notifications:', error);
    //     }
    // };
    
    // useEffect(() => {
    //     getNotifications();
        
    //     const channel = window.Echo.private(`notifications.${auth.user.id}`)
    //         .listen('NotificationSent', (e) => {
    //             getNotifications();
    //         });

    //     return () => {
    //         channel.stopListening('NotificationSent');
    //     };
    // }, [auth.user.id]);
    
    const highlightMentions = (text) => {
        if (!text) return text;
        const mentionRegex = /(@[\w\u00C0-\u017F\u4E00-\u9FFF]+)/g;
        const parts = text.split(mentionRegex);
        
        return parts.map((part, index) => {
            if (mentionRegex.test(part)) {
                return (
                    <span key={index} className="bg-blue-100 text-blue-500">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Notifications" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4 text-green-500">Notifications</h1>
                            <ul>
                                {messages.map((message) => (
                                    <li key={message.id} className="mb-4">
                                        <div className="bg-gray-100 p-4 rounded">
                                            <p><strong>{message.user.user_name}</strong> mentioned you in <strong className="text-red-400">{message.conversation.name}</strong></p>
                                            <p className="mt-2">{highlightMentions(message.message)}</p>
                                            <p className="text-sm text-gray-500">
                                                {message.created_at ? new Date(message.created_at).toLocaleString() :  new Date().toLocaleString()}
                                            </p>
                                            <PrimaryButton
                                                onClick={() => markAsRead(message.id)}
                                                className={`mt-2 p-2 rouded ${
                                                    message.users[0] && message.users[0].pivot.is_read === 1 ? 'bg-green-500' : 'bg-red-500'
                                                } text-white`}
                                            >
                                                {message.users[0] && message.users[0].pivot.is_read === 1 ? '既読' : '未読'}
                                            </PrimaryButton>
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
