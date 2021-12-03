const express = require('express')

const router = express.Router();

const pacienteCtr = require('../controllers/paciente.controller')

const { checkTokenPsicologo } = require('../auth/token_validation');
const { checkTokenMonitor } = require('../auth/token_validation');

//Monitor
router.get('/lista-pacientes-no-asignados', checkTokenMonitor, pacienteCtr.readNoAsignadoPaciente); // listar paciente no asignados
router.get('/lista-pacientes-asignados', checkTokenMonitor, pacienteCtr.readAsignadoPaciente); // lista de pacientes asignados
router.get('/lista-pacientes/:id', checkTokenMonitor, pacienteCtr.readPaciente); // listar paciente por id
router.put('/derivar-paciente/:id', checkTokenMonitor, pacienteCtr.updatePacienteDerivar); // Derivar Paciente
router.delete('/eliminar-consulta/:id', checkTokenMonitor, pacienteCtr.eliminarConsulta); // Eliminar La Consulta

//Psicologo
router.get('/paciente-asignado/:id', checkTokenPsicologo, pacienteCtr.readPacienteAsigPsi);//Paciente asignado a psicologo
router.post('/create-sesion', checkTokenPsicologo, pacienteCtr.createSesion); // Crear Sesion
router.put('/update-sesion/:id', checkTokenPsicologo, pacienteCtr.updateSesion); // Update sesion

//Paciente
router.post('/agregar-consulta',  pacienteCtr.createPaciente); // Crear paciente



module.exports = router;