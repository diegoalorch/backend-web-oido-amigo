const pool = require('../database')
    // const helpers = require('../libs/helpers');

const pacienteCtr = {}

// LISTAR TODAS LAS PERSONAS NO ASIGNADAS
pacienteCtr.readNoAsignadoPaciente = async(req, res) => {
    try {
        const response = await pool.query('select pa.idpaciente, p.nombres, p.apellidos, p.telefono, p.pais from paciente pa, persona p where pa.idpersona=p.idpersona and idpsicologo is null order by nombres asc');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

// LISTAR TODAS LAS PERSONAS ASIGNADAS
pacienteCtr.readAsignadoPaciente = async(req, res) => {
    try {
        const response = await pool.query('select pa.idpaciente, p.nombres, p.apellidos, p.telefono, p.pais, pa.motivoconsulta from paciente pa, persona p where pa.idpersona=p.idpersona and idpsicologo is not null order by nombres asc');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

// LISTAR Paciente POR ID
pacienteCtr.readPaciente = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pa.idpaciente, p.nombres, p.apellidos, p.telefono, p.pais, pa.motivoconsulta from paciente pa, persona p where idpaciente=$1 and pa.idpersona=p.idpersona', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

// CREAR CONSULTA PACIENTE
pacienteCtr.createPaciente = async(req, res) => {
    try {
        const { nombres, apellidos, telefono, pais, motivoconsulta, idpersona } = req.body;
        const result = await pool.query('insert into persona(nombres, apellidos, telefono, pais) values($1,$2,$3,$4) returning *', [nombres, apellidos, telefono, pais]); // returning devuelve todo los datos
        await pool.query('insert into paciente(motivoconsulta, idpersona) values($1,$2)', [motivoconsulta, result.rows[0].idpersona]);
        return res.status(200).json(`Paciente ${ nombres } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

// DERIVAR PACIENTE
pacienteCtr.updatePacienteDerivar = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { idpsicologo } = req.body;
        await pool.query('update paciente set idpsicologo=$1 where idpaciente=$2', [idpsicologo, id]);

        return res.status(200).json(`Paciente ${ id } se ha actualizado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

// ELIMINAR CONSULTA
pacienteCtr.eliminarConsulta = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from paciente where idpaciente=$1', [id]);

        return res.status(200).json(`Paciente ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

module.exports = pacienteCtr;