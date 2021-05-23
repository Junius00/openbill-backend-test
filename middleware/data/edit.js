const { modifyData } = require("./common");

//must be called after document byId
const editOne = async function(req, res) {
    const dataId = req.body.dataId;
    if (!dataId) {
        res.status(400).send('Please provide a Data ID.');
        return;
    }

    const newContent = req.body.content;
    if (!newContent) {
        res.status(400).send('Please provide the new data content.');
        return;
    }

    const document = req.document;
    const editContent = function(d) {
        d.content = newContent;
        return d;
    } 
    const [ dataEdited, headers ] = modifyData(document.headers, dataId, editContent);

    if (!dataEdited) {
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

module.exports = { editOne };