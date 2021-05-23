const { modifySubHeader, headerTitleMatch } = require("./common");

//must be called after document byId
const editOne = async function(req, res) {
    const headerId = req.body.headerId;
    let newTitle = req.body.title;

    if (!newTitle) {
        res.status(400).send('Please provide a new title.');
        return;
    }

    newTitle = newTitle.trim()
    if (newTitle.length < 1) {
        res.status(400).send('Title cannot be empty.');
        return;
    }
    
    const document = req.document;
    if (headerTitleMatch(document.headers, newTitle)) {
        res.status(400).send('A header with this title already exists.');
        return;
    }

    const changeHeaderTitle = function(h) {
        h.title = newTitle;
        return h;
    }

    const [ headerTitleModified, headers ] = modifySubHeader(document.headers, headerId, changeHeaderTitle);
    if (!headerTitleModified) {
        res.status(400).send('Cannot find header with ID provided.');
        return;
    }
    document.headers = headers;

    document.markModified('headers');
    await document.save()
        .then((doc) => {
            res.status(200).json({ headerId });
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

module.exports = { editOne };