const { Document } = require('../../models/Documents/Document');

const byId = async function(req, res, next) {
    //get documentId
    let docId;
    const { documentId } = req.body;
    if (documentId) docId = documentId;
    else docId = req.params.documentId;

    if (!docId) {
        res.status(400).send('Please provide a document ID.');
        return;
    }

    //find document
    await Document.findById(docId).exec()
        .then((doc) => {
                if (!doc) {
                    res.status(400).send("ID not found.");
                    return;
                }

                //go next if signalled
                if (req.signalNext) {
                    req.signalNext = false
                    req.document = doc;
                    next();
                    return;
                }

                res.status(200).json({document: doc.toJSON()});
            }
        )
        .catch((err) => {
            res.status(503).send(err);
        });

    
}

module.exports = { byId };