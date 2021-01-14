const express = require('express');

const UsedMaterialsController = require('../controllers/UsedMaterialsController');
const ensureAuthenticatedAdmin = require('../middlewares/ensureAuthenticatedAdmin');

const usedMaterialsRouter = express.Router();

usedMaterialsRouter.use(ensureAuthenticatedAdmin);

usedMaterialsRouter.get('/', UsedMaterialsController.list);
usedMaterialsRouter.post('/', UsedMaterialsController.store);
usedMaterialsRouter.get('/:id', UsedMaterialsController.show);
usedMaterialsRouter.put('/:id', UsedMaterialsController.edit);
usedMaterialsRouter.delete('/:id', UsedMaterialsController.destroy);

module.exports = usedMaterialsRouter;
