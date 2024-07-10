import React from 'react';
import { format, isToday } from 'date-fns';

export default function ChatMessages({ messages }) {
    const formatDate = (dateString) => {
        const date = dateString ? new Date(dateString) : new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    const formatDay = (dateString) => {
         const date = dateString ? new Date(dateString) : new Date();
         return format(date, 'yyyy-MM-dd');
    };
    
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
    
    let lastDate = '';
    
    return (
        <ul className="chat">
            {messages.map((message, index) => {
                const username = message.user ? message.user.user_name : 'Unknown';
                const mes = message.message;
                const messageDate = message.created_at ? new Date(message.created_at) : new Date;
                const time = formatDate(message.created_at);
                const formattedDay = formatDay(message.created_at);
                
                let showDate = false;
                if (formattedDay !== lastDate) {
                    showDate = true;
                    lastDate = formattedDay;
                }


                return (
                    <React.Fragment key={index}>
                        {showDate && !isToday(messageDate) && (
                            <li className="text-center my-4">
                                <span className="bg-gray-200 px-2 py-1 rounded">{formattedDay}</span>
                            </li>
                        )}
                        <li key={index}>
                            <strong>{username}</strong> <span className="text-black-200 text-sm">({time})</span>
                            <div className="mb-2 text-black">
                                <p className="bg-white inline p-1 mb-2 rounded whitespace-pre-line">
                                    {highlightMentions(mes)} 
                                </p>
                            </div>
                        </li>
                    </React.Fragment>
                );
            })}
        </ul>
    );
}