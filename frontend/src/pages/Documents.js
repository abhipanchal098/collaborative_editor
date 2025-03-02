import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApiService, deleteApiService } from '../services/ApiService';


const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getApiService('documents/get-all-documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const deleteDocument = async (docId) => {
    try {

      let confirm = window.confirm('Are you sure you want to delete this document?');
      if (!confirm) {
        return;
      }

      const response = await deleteApiService(`documents/delete-document/${docId}`);
      if (response.status) {
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== docId));
      } else {
        console.error('Error deleting document:', response.status);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{documents.length ? `All Documents` : `No Document Found`}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(documents || []).map((doc, docInx) => (
          <div className="relative" key={docInx}>
            <Link
              to={`/editor/${doc._id}`}
              key={doc._id}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
              <p className="text-sm text-gray-600">
                Last modified: {new Date(doc.updatedAt).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </Link>
            <i className="fa fa-trash absolute top-4 right-4 text-gray-500 text-red-500 cursor-pointer"
              onClick={e => deleteDocument(doc._id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
