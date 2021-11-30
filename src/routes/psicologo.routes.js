const express = require('express')

const router = express.Router();

const psicologoCtr = require('../controllers/psicologo.controller')
const { checkTokenPsicologo } = require('../auth/token_validation');


router.post('/create', psicologoCtr.createPsicologo);



module.exports = router;