var documentRouter = require('express').Router();

// get JWT handler
const jwtHandler = require('../auth/middleware').jwtHandler;

//get all document middleware
const documentMiddleware = require('../middleware/document');

//get signaller
const { signalNext } = require('../middleware/routing/signalling');

//attach all relevant CRUD routes
const byIdMiddleware = [jwtHandler, signalNext, documentMiddleware.byId];

documentRouter.post('/page', jwtHandler, documentMiddleware.page);
documentRouter.post('/create', jwtHandler, documentMiddleware.create);
documentRouter.post('/delete', jwtHandler, documentMiddleware.delete);
documentRouter.post('/upvote', ...byIdMiddleware, documentMiddleware.upvote);
documentRouter.post('/downvote', ...byIdMiddleware, documentMiddleware.downvote);
documentRouter.post('/:documentId', jwtHandler, documentMiddleware.byId);

module.exports = documentRouter;