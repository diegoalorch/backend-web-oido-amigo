const express = require('express')

const router = express.Router();

const pacienteCtr = require('../controllers/paciente.controller')

const { checkTokenPsicologo } = require('../auth/token_validation');

router.get('/lista-pacientes-no-asignados', checkTokenPsicologo, pacienteCtr.readNoAsignadoPaciente); // listar paciente no asignados
router.get('/lista-pacientes-asignados', checkTokenPsicologo, pacienteCtr.readAsignadoPaciente); // lista de pacientes asignados
router.get('/lista-pacientes/:id', checkTokenPsicologo, pacienteCtr.readPaciente); // listar paciente por id
router.post('/agregar-consulta', checkTokenPsicologo, pacienteCtr.createPaciente); // CREAR paciente
router.put('/derivar-paciente/:id', checkTokenPsicologo, pacienteCtr.updatePacienteDerivar); // Derivar Paciente
router.delete('/eliminar-consulta/:id', checkTokenPsicologo, pacienteCtr.eliminarConsulta); // Eliminar La Consulta


module.exports = router;