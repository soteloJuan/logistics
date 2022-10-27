const { Router } = require('express');
const { create, getAll } = require('../controllers/statusOrder.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createStatusOrder', create); // ACCESS ONLY ADMIN
router.get('/getAllStatusOrder', getAll); 



module.exports = router;
