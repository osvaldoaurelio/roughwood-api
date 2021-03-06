const express = require('express');

const OrdersController = require('../controllers/OrdersController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');
const ensureAuthenticatedUser = require('../middlewares/ensureAuthenticatedUser');

const ordersRouter = express.Router();

ordersRouter.get('/', ensureAuthenticatedAdmin, OrdersController.list);
ordersRouter.get('/mine', ensureAuthenticatedUser, OrdersController.mine);
ordersRouter.post('/', ensureAuthenticatedAdmin, OrdersController.store);
ordersRouter.get('/:id', ensureAuthenticatedAdmin, OrdersController.show);
ordersRouter.put('/:id', ensureAuthenticatedAdmin, OrdersController.edit);
ordersRouter.put('/:id/invoice', ensureAuthenticatedAdmin, OrdersController.invoice);
ordersRouter.put('/:id/done', ensureAuthenticatedUser, OrdersController.done);
ordersRouter.put('/:id/progress', ensureAuthenticatedUser, OrdersController.progress);
ordersRouter.delete('/:id', ensureAuthenticatedAdmin, OrdersController.destroy);

module.exports = ordersRouter;
