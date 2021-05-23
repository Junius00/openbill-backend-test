const { addOne } = require("./add");
const { app } = require("./app");
const { deleteOne } = require("./delete");
const { editOne } = require("./edit");

module.exports = {
    add: addOne,
    delete: deleteOne,
    edit: editOne,
    app: app
}