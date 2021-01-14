const express = require('express');

const SessionsController = require('../controllers/SessionsController');

const sessionsRouter = express.Router();

sessionsRouter.post('/admin', SessionsController.createAdmin);
sessionsRouter.post('/user', SessionsController.createUser);

module.exports = sessionsRouter;
