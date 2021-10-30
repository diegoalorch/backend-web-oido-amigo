import { Router } from 'express'

const router = Router();

import * as userCtr from '../controllers/user.controller'
const { checkTokenPsicologo } = require('../auth/token_validation');


router.post('/create', userCtr.createUser);



export default router;