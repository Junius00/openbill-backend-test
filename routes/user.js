var userRouter = require('express').Router();

//auth middleware
const auth = require('../auth/middleware');

//user By ID middleware
const { userById } = require('../middleware/user/userById');

//attach login, logout, register middleware to router
userRouter.post('/login', auth.loginHandler);
userRouter.post('/register', auth.registerHandler);
userRouter.post('/logout', auth.logoutHandler);
userRouter.post('/refresh', auth.refreshTokenHandler);

//retrieve user information by ID
userRouter.post('/:userId', auth.jwtHandler, auth.userIdCheckHandler, userById); 

module.exports = userRouter;