const express = require('express');

const CustomersController = require('../controllers/CustomersController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');

const customersRouter = express.Router();

customersRouter.use(ensureAuthenticatedAdmin);

customersRouter.get('/', CustomersController.list);
customersRouter.post('/', CustomersController.store);
customersRouter.get('/:id', CustomersController.show);
customersRouter.get('/:id/orders', CustomersController.orders);
customersRouter.put('/:id', CustomersController.edit);
customersRouter.delete('/:id', CustomersController.destroy);

module.exports = customersRouter;
