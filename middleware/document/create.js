const { Document } = require('../../models/Documents/Document');

const createOne = async function(req, res, next) {
    const documentNullMsg = 'Please provide a document.';

    //draw document from body, attach user ID
    const { document } = req.body;
    if (!document) {
        res.status(400).send(documentNullMsg);
        return;
    }
    document.author = req.user.id;

    const newDocument = new Document(document);
    newDocument.save((err) => {
        if (err) {
            res.status(503).send(err);
            return;
        }

        if (req.signalNext) {
            req.signalNext = false;
            req.document = newDocument;
            next();
            return;
        }
        res.status(200).json({ documentId: newDocument._id });
    });
}

module.exports = { createOne };