import {pool} from '../database'
const helpers = require('../libs/helpers');

export const createUser = async(req, res)=>{
    try {
        const{ username, password, idrol, idpsicologo} = req.body;
        const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into usuario(username, password, idrol, idpsicologo) values($1,$2,$3,$4)', [username, password2, idrol, idpsicologo]);
        return res.status(200).json(
            `Usuario ${ username } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}