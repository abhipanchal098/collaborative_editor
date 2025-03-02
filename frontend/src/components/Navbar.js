import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postApiService } from '../services/ApiService';

const Navbar = () => {
    const navigate = useNavigate();
    const [btnDisabled, isBtnDisabled] = useState(false);

    const createNewDocument = async () => {
        try {
            let postData = {
                title: 'New Document',
                content: '',
            };
            isBtnDisabled(true);
            const response = await postApiService('documents/create-new-document', postData);
            isBtnDisabled(false);
            navigate(`/editor/${response.data._id}`);
        } catch (error) {
            console.error('Error creating new document:', error);
        }
    };
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-gray-800">CollabEditor</span>
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            to="/documents"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Document List
                        </Link>
                        <button type='button' onClick={createNewDocument} disabled={btnDisabled}
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Create New Document
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/');
                            }}
                            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
