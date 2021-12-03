const express = require('express')

const router = express.Router();

const pacienteCtr = require('../controllers/paciente.controller')

const { checkTokenPsicologo } = require('../auth/token_validation');
const { checkTokenMonitor } = require('../auth/token_validation');

router.get('/lista-pacientes-no-asignados', checkTokenMonitor, pacienteCtr.readNoAsignadoPaciente); // listar paciente no asignados
router.get('/lista-pacientes-asignados', checkTokenMonitor, pacienteCtr.readAsignadoPaciente); // lista de pacientes asignados
router.get('/lista-pacientes/:id', checkTokenMonitor, pacienteCtr.readPaciente); // listar paciente por id
router.get('/lista-paciente-asignado/:id', checkTokenPsicologo, pacienteCtr.readPacienteAsigPsi); // lista paciente asignado a psicologo
router.post('/agregar-consulta',  pacienteCtr.createPaciente); // CREAR paciente
router.put('/derivar-paciente/:id', checkTokenMonitor, pacienteCtr.updatePacienteDerivar); // Derivar Paciente
router.delete('/eliminar-consulta/:id', checkTokenMonitor, pacienteCtr.eliminarConsulta); // Eliminar La Consulta


module.exports = router;