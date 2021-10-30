import { Router } from 'express'

const router = Router();

import * as psicologosCtr from '../controllers/psicologos.controller'

// const { checkToken } = require('../auth/token_validation');

router.get('/lista-psicologos', psicologosCtr.readAllPsicologos); // listar paciente totales
router.get('/lista-psicologos-nom-ap', psicologosCtr.readNomApePsicologos); // Lista de Psicologos por Nombre y Apellidos
router.get('/lista-psicologos-nom-apl/:id', psicologosCtr.buscarPsicologoID); // Buscar y Listar por id Piscologo
router.get('/lista-psicologos-select/:id', psicologosCtr.readPsicologoSelect); // Listar por selección del html
router.post('/create', psicologosCtr.createPsicologo);//Crear Psicologo

export default router;