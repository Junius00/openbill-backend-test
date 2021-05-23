const { modifyData } = require("./common");

//must be called after document byId
const app = async function(req, res) {
    const dataId = req.body.dataId;
    if (!dataId) {
        res.status(400).send('Please provide a Data ID.');
        return;
    }

    const document = req.document;
    let approvedStatus;
    const flipApproved = function(d) {
        d.approved = !(d.approved);
        approvedStatus = d.approved;
        return d;
    }

    const [ approvedFlipped, headers ] = modifyData(document.headers, dataId, flipApproved);

    if (!approvedFlipped) {
        res.status(400).send('Could not find data with ID.');
        return;
    }

    document.headers = headers;
    document.markModified('headers');
    await document.save()
        .then((doc) => {
            res.status(200).json({ dataId, approvedStatus });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { app };