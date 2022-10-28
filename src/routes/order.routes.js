const { Router } = require('express');
const { create } = require('../controllers/order.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createOrder', validationJwt.validationJWTGeneral, create);



module.exports = router;
