const { modifyData } = require("./common");

//must be called after document byId
const deleteOne = async function(req, res) {
    const dataId = req.body.dataId;
    if (!dataId) {
        res.status(400).send('Please provide a Data ID.');
        return;
    }

    const document = req.document;
    const [ dataDeleted, headers ] = modifyData(document.headers, dataId, (d) => undefined);

    if (!dataDeleted) {
        res.status(400).send('Could not find data with ID.');
        return;
    }

    document.headers = headers;
    document.markModified('headers');
    await document.save()
        .then((doc) => {
            res.status(200).json({ dataId });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { deleteOne };