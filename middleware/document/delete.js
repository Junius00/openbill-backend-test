const { Document } = require('../../models/Documents/Document');

const deleteOne = async function(req, res, next) {
    const { documentId } = req.body;

    if (!documentId) {
        res.status(400).send('Please provide a document ID.');
        return;
    }
    const docFind = await Document.findById(documentId).exec();
    if (!docFind) {
        res.status(403).send('No such document.');
        return;
    }

    await Document.deleteOne({_id: documentId })
        .then(() => {
            if (req.signalNext) {
                req.signalNext = false;
                req.documentId = documentId;
                next();
                return;
            }

            res.status(200).json({ documentId });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
    
    
};

module.exports = { deleteOne };