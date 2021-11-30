const express = require('express')

const router = express.Router();

const pacienteCtr = require('../controllers/paciente.controller')

// const { checkToken } = require('../auth/token_validation');

router.get('/lista-pacientes-no-asignados', pacienteCtr.readAllPaciente); // listar paciente totales
router.get('/lista-pacientes-asignados', pacienteCtr.readAsignadoPaciente);
router.get('/lista-pacientes/:id', pacienteCtr.readPaciente); // listar paciente por id
router.post('/agregar-consulta', pacienteCtr.createPaciente); // CREAR paciente
router.put('/derivar-paciente/:id', pacienteCtr.updatePacienteDerivar); // Derivar Paciente
router.delete('/eliminar-consulta/:id', pacienteCtr.eliminarConsulta); // Eliminar La Consulta


module.exports = router;