const { Data } = require("../../models/Documents/Data");
const { modifySubHeader } = require("../header/common");

//must be called after document byId
const addOne = async function(req, res) {
    const subheaderId = req.body.subheaderId;
    if (!subheaderId) {
        res.status(400).send('Please provide a sub header ID.');
        return;
    }

    const dataObj = req.body.data;
    if (!dataObj) {
        res.status(400).send('Please provide a Data object.');
        return;
    }
    
    const data = new Data(dataObj);
    const dataError = data.validateSync();
    if (dataError) {
        res.status(400).send(dataError.message);
        return;
    }

    const document = req.document;

    const addData = function(h) {
        h.subData.push(data.toJSON());
        return h;
    }
    const [dataAdded, headers] = modifySubHeader(document.headers, subheaderId, addData);
    if (!dataAdded) {
        res.status(400).send('Could not find sub header ID.');
        return;
    }

    document.headers = headers;
    document.markModified('headers');

    await document.save()
        .then((doc) => {
            res.status(200).json({ dataId: data._id });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { addOne };