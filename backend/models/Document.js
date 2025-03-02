const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var DocumentSchema = mongoose.Schema({
    created_by: ObjectId,
    title: String,
    content: String,
},
    { timestamps: true } // This will automatically handle createdAt and updatedAt
);

module.exports = mongoose.model('Document', DocumentSchema);
