import express from 'express'
import morgan from 'morgan'
import personaRoutes from './routes/persona.routes'

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

app.use('/api/auth/personas', personaRoutes);

export default app;