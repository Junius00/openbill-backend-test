const { addOne } = require('./add');
const { deleteOne } = require('./delete');
const { editOne } = require('./edit');

module.exports = {
    add: addOne,
    delete: deleteOne,
    edit: editOne
}