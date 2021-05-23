const { createOne } = require('./create');
const { deleteOne } = require('./delete');
const { byId } = require('./byId');
const { downvote, upvote } = require('./rating');
const { page } = require('./page');
const { verifyAuthor } = require('./verifyAuthor');

module.exports = {
    page: page,
    create: createOne,
    delete: deleteOne,
    byId: byId,
    upvote: upvote,
    downvote: downvote,
    verifyAuthor: verifyAuthor
}