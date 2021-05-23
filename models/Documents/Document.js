const { headerSchema } = require('./Header');

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    author: mongoose.Types.ObjectId,
    upvotedBy: [mongoose.Types.ObjectId],
    downvotedBy: [mongoose.Types.ObjectId],
    docType: String,
    title: String,
    summary: String,
    headers: [headerSchema]
});

const Document = mongoose.model('Document', documentSchema);

module.exports = { documentSchema, Document };