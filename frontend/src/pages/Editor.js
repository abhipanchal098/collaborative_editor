import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { BASE_URL } from'../services/ApiService';
let socket;

const Editor = () => {
    const { id } = useParams();
    const [content, setContent] = useState({
        title: '',
        content: '',
    });
    const [isTyping, setIsTyping] = useState('');

    useEffect(() => {
        socket = io(BASE_URL, {
            auth: {
                token: localStorage.getItem('token') // Assuming token is stored in localStorage
            }
        });
        
        socket.emit('join-document', id);

        socket.on('receive-changes', (document) => {
            if (document.id === id) {
                setContent(document);
            }
        });

        socket.on('on-typing-response', (ress) => {
            if (ress.id === id) {
                setIsTyping(ress.userInfo.name + ' is typing...');
            }
            setTimeout(() => {
                setIsTyping('');
            }, 1000);
        });

        socket.on('load-document', (document) => {
            setContent(document);
        });

        // cleanup
        return () => socket.off('receive-changes');
    }, []);

    const handleOnBlur = (key, e) => {
        const newContent = {
            ...content,
            [key]: e.target.value,
        };
        setContent(newContent);
        socket.emit('send-changes', { id, content: newContent });
    };

    const handleOnChange = (key, e) => {
        const newContent = {
            ...content,
            [key]: e.target.value,
        };
        setContent(newContent);
        socket.emit('on-typing', { id });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Collaborative Editor
                </h1>
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={content.title}
                            onBlur={e => handleOnBlur('title', e)}
                            onChange={e => handleOnChange('title', e)}
                            placeholder="Enter document title..."
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute right-2 top-2 text-sm text-gray-500">
                            {isTyping}
                        </div>
                    </div>
                    <div className="relative">
                        <textarea
                            rows="15"
                            value={content.content}
                            onBlur={e => handleOnBlur('content', e)}
                            onChange={e => handleOnChange('content', e)}
                            placeholder="Start typing your content here..."
                            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
