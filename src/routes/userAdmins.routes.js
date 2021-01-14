const express = require('express');

const UserAdminsController = require('../controllers/UserAdminsController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');

const userAdminsRouter = express.Router();

userAdminsRouter.post('/', UserAdminsController.store);
userAdminsRouter.get('/me', ensureAuthenticatedAdmin, UserAdminsController.me);
userAdminsRouter.put('/', ensureAuthenticatedAdmin, UserAdminsController.edit);
userAdminsRouter.delete('/', ensureAuthenticatedAdmin, UserAdminsController.destroy);

module.exports = userAdminsRouter;
