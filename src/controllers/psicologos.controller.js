import { pool } from '../database'
// const helpers = require('../libs/helpers');

// LISTAR TODOS LOS PSICOLOGOS
export const readAllPsicologos = async(req, res) => {
    try {
        const response = await pool.query('select pe.nombres, pe.apellidos, pe.telefono, pe.correo, p.universidad, p.gradoacademico from psicologos p, persona pe where p.idpersona=pe.idpersona order by nombres asc');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//LISTA POR NOMBRE Y APELLIDO PSICOLOGOS
export const readNomApePsicologos = async(req, res) => {
    try {
        const response = await pool.query('select p.idpsicologo, pe.nombres, pe.apellidos from psicologos p, persona pe where p.idpersona=pe.idpersona order by nombres asc');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Serer Error...!');
    }
}

// Buscar y Listar por ID psicologo
export const buscarPsicologoID = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select p.idpsicologo, pe.nombres, pe.apellidos, p.universidad, p.gradoacademico from psicologos p, persona pe where p.idpsicologo=$1 and p.idpersona=pe.idpersona', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

// LISTA DE COMPLETA CAMPOS DEL PSICOLOGO MODAL 2
export const readPsicologoSelect = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select ps.idpsicologo, p.nombres, p.apellidos , p.correo, ps.universidad, ps.gradoacademico from psicologos ps, persona p where idpsicologo=$1 and ps.idpersona=p.idpersona', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}