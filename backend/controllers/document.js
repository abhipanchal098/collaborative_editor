const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Document = require('../models/Document');


async function createDocument(req, res) {
    try {
        const { title, content } = req.body;
        const document = new Document({ title, content, created_by: req.user._id });
        let a = await document.save();
        return res.status(201).json({ status: 1, data: a });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
}

async function getAllDocuments(req, res) {
    try {
        const documents = await Document.find();
        return res.status(200).json({ status: 1, data: documents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
}

async function deleteDocument(req, res) {
    try {
        const documentId = req.params.id;
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ status: 0, message: 'Document not found' });
        }
        await Document.deleteOne({ _id: documentId });
        return res.status(200).json({ status: 1, message: 'Document deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
}

async function updateDocument(data) {
    try {
        const document = await Document.findByIdAndUpdate(
            data.id,
            { title: data.title, content: data.content },
            { new: true }
        );
        if (!document) { return false; }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    createDocument,
    getAllDocuments,
    updateDocument,
    deleteDocument
}
