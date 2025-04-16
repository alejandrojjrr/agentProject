// Cargar dotenv al principio absoluto del archivo con path explícito
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Para depuración - muestra si la variable de entorno se cargó
console.log('¿MONGODB_URI está definido?', !!process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Si no se carga desde .env, definimos una URL de conexión por defecto
// Esta es una solución temporal mientras resuelves el problema con dotenv
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://amilla:mj7l1oVyLOqi1PAf@cluster0.64lbxhq.mongodb.net/?retryWrites=true&w=majority';
}

// Database connection
console.log('Intentando conectar a MongoDB con URI:', 
  process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // Timeout de 30 segundos
  heartbeatFrequencyMS: 2000,     // Latido más frecuente
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => {
  console.error('Error de conexión MongoDB:', err);
  console.log('Asegúrate de que el archivo .env existe y contiene MONGODB_URI correcta');
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/agents', require('./routes/agent.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});