const express = require('express');

const UsersController = require('../controllers/UsersController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');

const usersRouter = express.Router();

usersRouter.use(ensureAuthenticatedAdmin);

usersRouter.get('/', UsersController.list);
usersRouter.post('/', UsersController.store);
usersRouter.get('/:id', UsersController.show);
usersRouter.put('/:id', UsersController.edit);
usersRouter.delete('/:id', UsersController.destroy);

module.exports = usersRouter;
