import { pool } from '../database'
// const helpers = require('../libs/helpers');

// LISTAR TODAS LAS PERSONAS
export const readAllPersona = async(req, res) => {
    try {
        const response = await pool.query('select *from persona');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
} 

// LISTAR PERSONA POR ID
export const readPersona = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from persona where idpersona=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
// export const delPersona = async(req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         const response = await pool.query('delete from persona where idpersona=$1', [id]);
//         return res.status(200).json(
//             `Persona ${ id } eliminado correctamente...!`);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json('Internal Server error...!');
//     }
// }
// export const updatePersona = async(req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         const { username, password } = req.body;
//         await pool.query('update persona set username=$1, password=$2 where idusuario=$3', [username, password, id]);
//         return res.status(200).json(
//             `Persona ${ id } modificado correctamente...!`);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json('Internal Server error...!');
//     }
// }
// export const createPersona = async(req, res) => {
//     try {
//         const { idusuario, username, password } = req.body;
//         const password2 = await helpers.encryptPassword(password);
//         await pool.query('insert into usuario(idusuario, username, password) values($1,$2,$3)', [idusuario, username, password2]);
//         return res.status(200).json(
//             `Usuario ${ username } creado correctamente...!`);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json('Internal Server error...!');
//     }
// }
