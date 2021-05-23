var dataRouter = require('express').Router();

//get JWT Handler
const { jwtHandler } = require('../auth/middleware');

//get document middleware
const documentMiddleware = require('../middleware/document');
const { signalNext } = require('../middleware/routing/signalling');

//get data middleware
const dataMiddleware = require('../middleware/data');

//make byId set
const commonMiddleware = [jwtHandler, signalNext, documentMiddleware.byId, documentMiddleware.verifyAuthor];

//All CRUD Operations
dataRouter.post('/add', ...commonMiddleware, dataMiddleware.add);
dataRouter.post('/delete', ...commonMiddleware, dataMiddleware.delete);
dataRouter.post('/edit', ...commonMiddleware, dataMiddleware.edit);
dataRouter.post('/app', ...commonMiddleware, dataMiddleware.app);

module.exports = dataRouter;