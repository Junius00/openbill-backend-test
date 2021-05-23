const { Header } = require("../../models/Documents/Header");
const { modifySubHeader, headerTitleMatch } = require("./common");

//must be called after document byId
const addOne = async function(req, res) {
    const subheaderId = req.body.subheaderId;
    const headerJSON = req.body.header;

    if (!headerJSON) {
        res.status(400).send('Please provide a Header object.');
        return;
    }

    const header = new Header(headerJSON);
    const headerError = header.validateSync()
    if (headerError) {
        res.status(400).send(headerError.message);
        return;
    }
    
    const document = req.document;
    if (headerTitleMatch(document.headers, header.title)) {
        res.status(400).send('A header with this title already exists.');
        return;
    }

    if (subheaderId) {
        const addToSubHeader = function(h) {
            h.subHeaders.push(header.toJSON());
            return h;
        }

        const [ headerAdded, headers ] = modifySubHeader(document.headers, subheaderId, addToSubHeader);
        if (!headerAdded) {
            res.status(400).send('Cannot find sub header with ID provided.');
            return;
        }
        document.headers = headers;
    }
    else {
        document.headers.push(header.toJSON());
    }

    document.markModified('headers');
    await document.save()
        .then((doc) => {
            res.status(200).json({ headerId: header._id });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { addOne }