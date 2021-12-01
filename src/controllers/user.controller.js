const pool = require('../database')
const helpers = require('../libs/helpers');
const bcrypt = require('bcryptjs');

const userCtr = {}


userCtr.getAccess = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        const resp = await pool.query('select * from accesos where idrol =$1',[id]);
        return res.status(200).json(resp.rows);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

userCtr.createUser = async(req, res)=>{

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

userCtr.updateUser = async(req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { pass } = req.body;
            const response = await pool.query('select * from usuario where idusuario = $1', [id]);      
            if(response.rows.length!=0){
                const passold = response.rows[0].password;
                if(await bcrypt.compare(pass, passold)){
                    const {username, password} = req.body;
                    const password2 = await helpers.encryptPassword(password);
                    await pool.query('update usuario set username=$1, password=$2 where idusuario=$3', [username, password2, id]);
                    return res.status(200).json(
                `Usuario ${ id } modificado correctamente...!`);
                 }
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error...!');
        }
    }

module.exports = userCtr;


