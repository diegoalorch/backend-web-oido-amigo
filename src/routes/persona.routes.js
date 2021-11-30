const express  = require('express')

const router = express.Router();

const personaCtr = require('../controllers/persona.controller')

// const { checkToken } = require('../auth/token_validation');

// router.get('/', checkToken, userCtr.readAllUsers);
// router.get('/:id', checkToken, userCtr.readUser);
// router.delete('/:id', checkToken, userCtr.delUser);
// router.post('/', checkToken, userCtr.createUser);
// router.put('/:id', checkToken, userCtr.updateUser);

router.get('/', personaCtr.readAllPersona); // listar personas totales
router.get('/:id', personaCtr.readPersona); // listar personas por id
// router.delete('/:id', personaCtr.delPersona);
// router.put('/:id', personaCtr.updatePersona);
// router.post('/', personaCtr.createPersona);


module.exports = router;