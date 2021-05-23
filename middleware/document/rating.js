const { Document } = require('../../models/Documents/Document');
const mongoose = require('mongoose');

//this must come after document by ID
const modifyVote = async function(req, res, shouldUpvote) {
    //take user ID and document
    const userId = req.user.id;
    const userObjectId = mongoose.Types.ObjectId(userId);

    const document = req.document;

    if (!userId) {
        res.status(503).send('Internal Error');
        return;
    }

    let inUpvoted = document.upvotedBy.includes(userId);
    let inDownvoted = document.downvotedBy.includes(userId);
    
    pullObj = {}
    pushObj = {}

    if (inUpvoted && inDownvoted) {
        pullObj[shouldUpvote ? "downvotedBy" : "upvotedBy"] = userObjectId;
    }
    else {
        if (shouldUpvote) {
            if (inUpvoted) {
                pullObj["upvotedBy"] = userObjectId;
            }
            else {
                if (inDownvoted) pullObj["downvotedBy"] = userObjectId;
                pushObj["upvotedBy"] = userObjectId;
            }
        }
        else {
            if (inDownvoted) {
                pullObj["downvotedBy"] = userObjectId;
            }
            else {
                if (inUpvoted) pullObj["upvotedBy"] = userObjectId;
                pushObj["downvotedBy"] = userObjectId;
            }
        }
    }
        

    updateObj = {}

    if (Object.keys(pullObj).length > 0) updateObj["$pull"] = pullObj;
    if (Object.keys(pushObj).length > 0) updateObj["$push"] = pushObj;

    await Document.updateOne({ _id: document._id }, updateObj)
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({ documentId: document._id });
                return
            }

            res.status(503).send('Cannot find document to update.');
        })
        .catch((err) => {
            res.status(503).send(err);
        });
}

const upvote = async function(req, res) {
    await modifyVote(req, res, true);
}

const downvote = async function (req, res) {
    await modifyVote(req, res, false);
}


module.exports = { upvote, downvote };