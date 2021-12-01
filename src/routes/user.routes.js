
const express  = require('express') ;

const router = express.Router();

const userCtr = require('../controllers/user.controller');

const { checkTokenPsicologo } = require('../auth/token_validation');


router.post('/create', userCtr.createUser);
router.put('/update/:id', userCtr.updateUser);


module.exports = router;

