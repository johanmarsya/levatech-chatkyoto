import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatForm({ user, sendMessage, usersInRoom }) {
    const [newMessage, setNewMessage] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const textareaRef = useRef(null);
    const [showUsers, setShowUsers] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setNewMessage(value);
        
        const lastWord = value.split(' ').pop();
        if (lastWord.startsWith('@')) {
            const query = lastWord.substring(1).toLowerCase();
            const filtered = usersInRoom.filter(u => u.user_name.toLowerCase().includes(query));
            setFilteredUsers(filtered);
            setShowUsers(true);
        } else {
            setShowUsers(false);
        }
    }
    
    const handleUserClick = (username) => {
        const words = newMessage.split(' ');
        words.pop();
        words.push(`@${username}`);
        setNewMessage(words.join(' ') + ' ');
        setShowUsers(false);
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
           if (e.shiftKey) {
               e.preventDefault();
               setNewMessage(newMessage + '\n');
           } else {
                e.preventDefault();
                sendMessage(newMessage);
                setNewMessage("");
           }
        } else {
            return false;
        }
        
    }
    
    const handleCompositionStart = () => {
        setIsComposing(true);
    }
    
    const handleCompositionEnd = (e) => {
        setIsComposing(false);
        handleChange(e);
    }
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, [newMessage]);

    return (
        <div className="text-center">
            {showUsers && (
                <ul className="absolute bg-white border border-gray-300 mt-2 w-1/2 mx-auto left-0 right-0 z-10">
                    {filteredUsers.map((user, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 coursor-pointer"
                            onClick={() => handleUserClick(user.user_name)}
                        >
                            {user.user_name}
                        </li>
                    ))}
                </ul>
            )}
            <textarea
                ref={textareaRef}
                className="border-0 border-white w-full"
                placeholder="メッセージを入力 (送信時はEnter, 改行時はShift+Enter)"
                value={newMessage}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                onCompositionStart={() => handleCompositionStart()}
                onCompositionEnd={(e) => handleCompositionEnd(e)}
                rows="2"
            />
        </div>
    );
}