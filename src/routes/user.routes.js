const { Router } = require('express');
const { create, login } = require('../controllers/user.controller');


const router = Router();

router.post('/createUser', create);
router.get('/loginUser', login);

module.exports = router;
