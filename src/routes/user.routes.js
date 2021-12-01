
const express  = require('express') ;

const router = express.Router();

const userCtr = require('../controllers/user.controller');


const { checkTokenMonitor } = require('../auth/token_validation');


router.get('/access/:id', userCtr.getAccess);
router.post('/create', checkTokenMonitor, userCtr.createUser);
router.put('/update/:id', userCtr.updateUser);


module.exports = router;

