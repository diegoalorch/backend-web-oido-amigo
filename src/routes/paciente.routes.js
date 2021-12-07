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

//Sesiones
router.get('/sesion1/:id', checkTokenPsicologo, pacienteCtr.readSesion1);//Sesion1
router.get('/sesion2/:id', checkTokenPsicologo, pacienteCtr.readSesion2);//Sesion2
router.get('/sesion3/:id', checkTokenPsicologo, pacienteCtr.readSesion3);//Sesion3

//Reportes
router.get('/reporte1/:id', checkTokenPsicologo, pacienteCtr.readreporte1);//Reporte1
router.get('/reporte2/:id', checkTokenPsicologo, pacienteCtr.readreporte2);//Reporte2
router.get('/reporte3/:id', checkTokenPsicologo, pacienteCtr.readreporte3);//Reporte3
router.get('/reportef/:id', checkTokenPsicologo, pacienteCtr.readreporteF);//Reporte Final


module.exports = router;