const express = require('express');

const customersRouter = require('./customers.routes');
const ordersRouter = require('./orders.routes');
const sessionsRouter = require('./sessions.routes');
const stockMaterialsRouter = require('./stockMaterials.routes');
const usedMaterialsRouter = require('./usedMaterials.routes');
const usersRouter = require('./users.routes');
const userAdminsRouter = require('./userAdmins.routes');

const router = express.Router();

router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);
router.use('/sessions', sessionsRouter);
router.use('/stock_materials', stockMaterialsRouter);
router.use('/used_materials', usedMaterialsRouter);
router.use('/users', usersRouter);
router.use('/user_admins', userAdminsRouter);

module.exports = router;
