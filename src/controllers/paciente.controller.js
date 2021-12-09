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

// LISTAR Paciente POR IDPSICOLOGO
pacienteCtr.readPacienteAsigPsi = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pa.idpaciente, p.nombres, p.apellidos, p.telefono, p.pais, p.correo, pa.motivoconsulta from paciente pa, persona p, psicologos ps where pa.idpsicologo = $1 and pa.idpersona=p.idpersona and pa.idpsicologo = ps.idpsicologo;', [id]);
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

//Paciente Finalizado

pacienteCtr.finalizarPaciente = async(req, res) => {
    try {
        const id = parseInt(req.params.id);        
        await pool.query('update paciente set idpsicologo = null where idpaciente = $1', [id]);

        return res.status(200).json(`Paciente se ha actualizado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//CREAR SESION1
pacienteCtr.createSesion1 = async(req, res) => {
    try {
        const { link, fecha, hora, idpaciente, idpsicologo } = req.body;
        await pool.query('insert into cronograma(link, fecha, hora, idpaciente, idpsicologo, idsesion, estado) values($1,$2,$3,$4,$5,1,0);', [link, fecha, hora, idpaciente, idpsicologo]);
        return res.status(200).json(`Cronograma creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//CREAR SESION2
pacienteCtr.createSesion2 = async(req, res) => {
    try {
        const { link, fecha, hora, idpaciente, idpsicologo } = req.body;
        await pool.query('insert into cronograma(link, fecha, hora, idpaciente, idpsicologo, idsesion, estado) values($1,$2,$3,$4,$5,2,0);', [link, fecha, hora, idpaciente, idpsicologo]);
        return res.status(200).json(`Cronograma creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//CREAR SESION3
pacienteCtr.createSesion3 = async(req, res) => {
    try {
        const { link, fecha, hora, idpaciente, idpsicologo } = req.body;
        await pool.query('insert into cronograma(link, fecha, hora, idpaciente, idpsicologo, idsesion, estado) values($1,$2,$3,$4,$5,3,0);', [link, fecha, hora, idpaciente, idpsicologo]);
        return res.status(200).json(`Cronograma creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//UPDATE SESION
pacienteCtr.updateSesion = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        await pool.query('update cronograma set estado = 1 where idcronograma = $1', [id]);
        return res.status(200).json(`Sesion Finalizado exitosamente...!`)
    }catch (e){
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select sesion 1
pacienteCtr.readSesion1 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from cronograma where idpaciente = $1 and idsesion = 1;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select sesion 2
pacienteCtr.readSesion2 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from cronograma where idpaciente = $1 and idsesion = 2;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select sesion 3
pacienteCtr.readSesion3 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from cronograma where idpaciente = $1 and idsesion = 3;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//Create Reporte 1
pacienteCtr.createReporte1 = async(req, res) => {
    try {
        const { idpsicologo, idpaciente, idmedio, fecha, obserg, ante, problem, accreal, conclu, recotare} = req.body;
        const result = await pool.query('insert into reportes(idpsicologo, idpaciente, idmedio, fecha, idsesion) values($1,$2,$3,$4,1) returning *', [idpsicologo, idpaciente, idmedio, fecha]); // returning devuelve todo los datos
        await pool.query('insert into preguntas(obserg, ante, problem, accreal, conclu, recotare, idreportes) values($1,$2,$3,$4,$5,$6,$7)', [obserg, ante, problem, accreal, conclu, recotare, result.rows[0].idreportes]);
        return res.status(200).json(`Reporte creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//Create Reporte 2
pacienteCtr.createReporte2 = async(req, res) => {
    try {
        const { idpsicologo, idpaciente, idmedio, fecha, obserg, ante, problem, accreal, conclu, recotare} = req.body;
        const result = await pool.query('insert into reportes(idpsicologo, idpaciente, idmedio, fecha, idsesion) values($1,$2,$3,$4,2) returning *', [idpsicologo, idpaciente, idmedio, fecha]); // returning devuelve todo los datos
        await pool.query('insert into preguntas(obserg, ante, problem, accreal, conclu, recotare, idreportes) values($1,$2,$3,$4,$5,$6,$7)', [obserg, ante, problem, accreal, conclu, recotare, result.rows[0].idreportes]);
        return res.status(200).json(`Reporte creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//Create Reporte 3
pacienteCtr.createReporte3 = async(req, res) => {
    try {
        const { idpsicologo, idpaciente, idmedio, fecha, obserg, ante, problem, accreal, conclu, recotare} = req.body;
        const result = await pool.query('insert into reportes(idpsicologo, idpaciente, idmedio, fecha, idsesion) values($1,$2,$3,$4,3) returning *', [idpsicologo, idpaciente, idmedio, fecha]); // returning devuelve todo los datos
        await pool.query('insert into preguntas(obserg, ante, problem, accreal, conclu, recotare, idreportes) values($1,$2,$3,$4,$5,$6,$7)', [obserg, ante, problem, accreal, conclu, recotare, result.rows[0].idreportes]);
        return res.status(200).json(`Reporte creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//Create Reporte Final
pacienteCtr.createReportef = async(req, res) => {
    try {
        const { idpsicologo, idpaciente, idmedio, fecha, obserg, ante, problem, accreal, conclu, recotare} = req.body;
        const result = await pool.query('insert into reportes(idpsicologo, idpaciente, idmedio, fecha, idsesion) values($1,$2,$3,$4,4) returning *', [idpsicologo, idpaciente, idmedio, fecha]); // returning devuelve todo los datos
        await pool.query('insert into preguntas(obserg, ante, problem, accreal, conclu, recotare, idreportes) values($1,$2,$3,$4,$5,$6,$7)', [obserg, ante, problem, accreal, conclu, recotare, result.rows[0].idreportes]);
        return res.status(200).json(`Reporte creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}



//select Reporte 1
pacienteCtr.readreporte1 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pe.nombres as nompaciente, pe.apellidos as apelpaciente, pe.correo, pae.nombres, pae.apellidos, r.fecha, s.sesion, pr.obserg, pr.ante, pr.problem, pr.accreal, pr.conclu, pr.recotare from reportes r, preguntas pr, medio m, sesion s, persona pe, psicologos ps, paciente pa, persona pae where r.idpaciente = $1 and s.idsesion = 1 and r.idreportes = pr.idreportes and r.idmedio = m.idmedio and r.idsesion = s.idsesion and pe.idpersona = ps.idpersona and pae.idpersona = pa.idpersona and r.idpaciente = pa.idpaciente and r.idpsicologo = ps.idpsicologo;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select Reporte 2
pacienteCtr.readreporte2 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pe.nombres, pe.apellidos, pe.correo, pae.nombres, pae.apellidos, r.fecha, s.sesion, pr.obserg, pr.ante, pr.problem, pr.accreal, pr.conclu, pr.recotare from reportes r, preguntas pr, medio m, sesion s, persona pe, psicologos ps, paciente pa, persona pae where r.idpaciente = $1 and s.idsesion = 2 and r.idreportes = pr.idreportes and r.idmedio = m.idmedio and r.idsesion = s.idsesion and pe.idpersona = ps.idpersona and pae.idpersona = pa.idpersona and r.idpaciente = pa.idpaciente and r.idpsicologo = ps.idpsicologo;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select Reporte 3
pacienteCtr.readreporte3 = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pe.nombres, pe.apellidos, pe.correo, pae.nombres, pae.apellidos, r.fecha, s.sesion, pr.obserg, pr.ante, pr.problem, pr.accreal, pr.conclu, pr.recotare from reportes r, preguntas pr, medio m, sesion s, persona pe, psicologos ps, paciente pa, persona pae where r.idpaciente = $1 and s.idsesion = 3 and r.idreportes = pr.idreportes and r.idmedio = m.idmedio and r.idsesion = s.idsesion and pe.idpersona = ps.idpersona and pae.idpersona = pa.idpersona and r.idpaciente = pa.idpaciente and r.idpsicologo = ps.idpsicologo;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

//select Reporte Final
pacienteCtr.readreporteF = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select pe.nombres, pe.apellidos, pe.correo, pae.nombres, pae.apellidos, r.fecha, s.sesion, pr.obserg, pr.ante, pr.problem, pr.accreal, pr.conclu, pr.recotare from reportes r, preguntas pr, medio m, sesion s, persona pe, psicologos ps, paciente pa, persona pae where r.idpaciente = $1 and s.idsesion = 4 and r.idreportes = pr.idreportes and r.idmedio = m.idmedio and r.idsesion = s.idsesion and pe.idpersona = ps.idpersona and pae.idpersona = pa.idpersona and r.idpaciente = pa.idpaciente and r.idpsicologo = ps.idpsicologo;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}


module.exports = pacienteCtr;