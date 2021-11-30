const query  = require('express');
const pool = require('../database')
const helpers = require('../libs/helpers');

const psicologoCtr = {}

psicologoCtr.createPsicologo = async(req, res)=>{
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

module.exports = psicologoCtr;