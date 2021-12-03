const express = require('express')

const router = express.Router();

const psicologosCtr = require('../controllers/psicologos.controller')


const { checkTokenMonitor } = require('../auth/token_validation');


router.get('/lista-psicologos', checkTokenMonitor, psicologosCtr.readAllPsicologos); // listar paciente totales
router.get('/lista-psicologos-nom-ap', checkTokenMonitor, psicologosCtr.readNomApePsicologos); // Lista de Psicologos por Nombre y Apellidos
router.get('/lista-psicologos-nom-apl/:id', psicologosCtr.buscarPsicologoID); // Buscar y Listar por id Piscologo
router.get('/lista-psicologos-select/:id', checkTokenMonitor,  psicologosCtr.readPsicologoSelect); // Listar por selección del html
router.post('/create', checkTokenMonitor, psicologosCtr.createPsicologo);//Crear Psicologo

module.exports = router;