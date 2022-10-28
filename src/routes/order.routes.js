const { Router } = require('express');
const { create, getByIdOrder, updateStatus, cancelOrder } = require('../controllers/order.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createOrder', validationJwt.validationJWTGeneral, create);
router.get('/getByIdOrder/:idOrder', validationJwt.validationJWTGeneral, getByIdOrder);
router.put('/updateStatus/:idOrder', validationJwt.validationJWTAdmin, updateStatus);
router.delete('/cancelOrder/:idOrder', validationJwt.validationJWTGeneral,cancelOrder);


module.exports = router;
