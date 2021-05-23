const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    author_id: mongoose.Types.ObjectId,
    content: String,
    approved: Boolean
});

const Data = mongoose.model('Data', dataSchema);

module.exports = { dataSchema, Data };