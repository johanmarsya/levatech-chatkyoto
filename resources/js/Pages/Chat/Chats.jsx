import React, { useState, useCallback, useEffect, } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatMessages from '@/Pages/Chat/ChatMessages';
import ChatForm from '@/Pages/Chat/ChatForm';
import { Head, usePage } from '@inertiajs/react';

export default function Chats({ auth, errors }) {
    const { props } = usePage();
    const conversationId = props.conversationId;
    const conversationName = props.conversationName;
    const user = auth.user;
    const [messages, setMessages] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]);

    // メッセージをバックエンドに送信
    const sendMessage = useCallback(async (message) => {
        await axios.post(route('chat.store', { conversation: conversationId }), { message: message });
        setMessages(prevState => ([ ...prevState, { message: message, user: user }]));
    }, [conversationId]);

    // チャットメッセージを取得する
    const getChatMessages = async () => {
        try {
            const res = await axios.get(route('chat.fetch', { conversation: conversationId }));
            setMessages(res.data);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };
    
    // チャットルーム内のユーザーを取得する
     const getUsersInRoom = async () => {
        try {
            const res = await axios.get(route('chat.users', { conversation: conversationId }));
            setUsersInRoom(res.data);
        } catch (error) {
            console.error('Error fetching users in room:', error);
        }
    };
    useEffect(() => {
        getChatMessages();
        getUsersInRoom();
        
        const channel = window.Echo
            .private(`chat.${conversationId}`)
            .listen('MessageSent', (e) => {
                getChatMessages();
            });
            
        return () => {
            channel.stopListening('MessageSent');
        };
    }, [conversationId]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-white leading-tight">{conversationName}</h2>}
        >
            <Head title="チャット" />

            <div className="py-12 h-[600px]  overflow-y-scroll p-3">
                <div className="mx-[8%] bg-white h-full overflow-y-scroll p-3">
                    <ChatMessages messages={messages} />
                </div>
                <div className="mx-[8%] bg-white border-t-2">
                    <ChatForm user={user} sendMessage={sendMessage} usersInRoom={usersInRoom}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}