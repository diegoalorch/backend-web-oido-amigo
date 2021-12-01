const express = require('express')
const morgan = require('morgan')


const personaRoutes = require('./routes/persona.routes')
const userRoutes = require('./routes/user.routes')
const psicologosRoutes = require('./routes/psicologos.routes')
const psicologoRoutes = require('./routes/psicologos.routes')
const authRoutes = require('./routes/auth.routes')
const pacienteRoutes = require('./routes/paciente.routes')


const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/', function(req, res, next) {
    res.send('Backend Oído Amigo Funciona Correctamente...!');
});

// app.use('/api/auth', authRoutes);
// app.use('/api/auth/users', userRoutes);

app.use('/api/personas', personaRoutes);
app.use('/api/psicologo', psicologoRoutes);
app.use('/api/psicologos', psicologosRoutes);
app.use('/api/paciente', pacienteRoutes);

app.use('/api/auth/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;