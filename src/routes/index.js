const { Router } = require('express');
const userRoutes = require('./user.routes');
const standarSizeRoutes = require('./standarSize.routes');
const statusOrderRoutes = require('./statusOrder.routes');


const router = Router();

router.use('/user', userRoutes);
router.use('/standarSize', standarSizeRoutes);
router.use('/statusOrder', statusOrderRoutes);


module.exports = router;
