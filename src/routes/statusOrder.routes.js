const { Router } = require('express');
const { create, getAll } = require('../controllers/statusOrder.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createStatusOrder', validationJwt.validationJWTAdmin, create);
router.get('/getAllStatusOrder', validationJwt.validationJWTAdmin, getAll); 



module.exports = router;
