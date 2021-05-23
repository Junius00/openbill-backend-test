const { dataSchema } = require('./Data'); 

const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    title: String,
    subHeaders: [this],
    subData: [dataSchema]
});

const Header = mongoose.model('Header', headerSchema);

module.exports = { headerSchema, Header };