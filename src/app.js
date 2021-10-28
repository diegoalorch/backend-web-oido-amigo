import express from 'express'
import morgan from 'morgan'
import personaRoutes from './routes/persona.routes'
import pacienteRoutes from './routes/paciente.routes'
import psicologosRoutes from './routes/psicologos.routes'

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

app.use('/api/auth/personas', personaRoutes); // PERSONA
app.use('/api/auth/paciente', pacienteRoutes); // PACIENTE
app.use('/api/auth/psicologos', psicologosRoutes); // PSICOLOGOS

export default app;