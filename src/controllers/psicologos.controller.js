import { pool } from '../database'
const helpers = require('../libs/helpers');
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

export const createPsicologo = async(req, res)=>{
    try {
        const{ nombres, apellidos, dni, correo, telefono, direccion, pais, idpersona, universidad, gradoacademico, username, password, idrol, idpsicologo} = req.body;
        const result = await pool.query('insert into persona(nombres, apellidos, dni, correo, telefono, direccion, pais) values($1,$2,$3,$4,$5,$6,$7) returning *', [nombres, apellidos, dni, correo, telefono, direccion, pais]);
        const result1 = await pool.query('insert into psicologos(idpersona, universidad, gradoacademico)values($1,$2,$3) returning *',[result.rows[0].idpersona, universidad, gradoacademico]);
        const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into usuario(username, password, idrol, idpsicologo) values($1,$2,$3,$4)', [username, password2, idrol, result1.rows[0].idpsicologo]);
        return res.status(200).json(
            `Psicologo ${ nombres } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}