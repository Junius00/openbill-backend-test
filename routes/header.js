var headerRouter = require('express').Router();

//get JWT Handler
const jwtHandler = require('../auth/middleware').jwtHandler;

//get header middleware
const headerMiddleware = require('../middleware/header');

//get all document middleware
const documentMiddleware = require('../middleware/document');

//get signaller
const { signalNext } = require('../middleware/routing/signalling');

//Add all CRUD Options
const commonMiddleware = [jwtHandler, signalNext, documentMiddleware.byId, documentMiddleware.verifyAuthor];

headerRouter.post('/add', ...commonMiddleware, headerMiddleware.add);
headerRouter.post('/edit', ...commonMiddleware, headerMiddleware.edit);
headerRouter.post('/delete', ...commonMiddleware, headerMiddleware.delete);
module.exports = headerRouter;
