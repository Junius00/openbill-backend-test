const { modifySubHeader } = require("./common");

//must be called after document byId
const deleteOne = async function(req, res) {
    const subheaderId = req.body.subheaderId;
    if (!subheaderId) {
        res.status(400).send('Please provide a subheader ID.');
        return;
    }

    const document = req.document;
    const deleteSubheader = function(h) {
        return undefined;
    }

    const [ headerDeleted, headers ] = modifySubHeader(document.headers, subheaderId, deleteSubheader);
    if (!headerDeleted) {
        res.status(400).send('Cannot find sub header with ID provided.');
        return;
    }

    document.headers = headers;

    document.markModified('headers');
    await document.save()
        .then((doc) => {
            res.status(200).json({ subheaderId });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { deleteOne };