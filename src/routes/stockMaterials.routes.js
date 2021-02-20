const express = require('express');

const StockMaterialsController = require('../controllers/StockMaterialsController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');

const stockMaterialsRouter = express.Router();

stockMaterialsRouter.use(ensureAuthenticatedAdmin);

stockMaterialsRouter.get('/', StockMaterialsController.list);
stockMaterialsRouter.get('/active', StockMaterialsController.active);
stockMaterialsRouter.post('/', StockMaterialsController.store);
stockMaterialsRouter.get('/:id', StockMaterialsController.show);
stockMaterialsRouter.put('/:id', StockMaterialsController.edit);
stockMaterialsRouter.delete('/:id', StockMaterialsController.destroy);

module.exports = stockMaterialsRouter;
