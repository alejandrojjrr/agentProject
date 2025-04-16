// Cargar dotenv al principio absoluto del archivo con path explícito
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Para depuración - muestra si la variable de entorno se cargó
console.log('Entorno:', process.env.NODE_ENV);
console.log('MONGODB_URI definido:', !!process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    // Si no se carga desde .env, definimos una URL de conexión por defecto
    // con la contraseña correcta
    process.env.MONGODB_URI = 'mongodb+srv://amilla:Serpiente@cluster0.64lbxhq.mongodb.net/?retryWrites=true&w=majority';
    console.log('Usando URI de MongoDB por defecto (no se encontró en .env)');
  }

  try {
    // Oculta la contraseña en los logs
    const uriForLog = process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@');
    console.log('Intentando conectar a MongoDB:', uriForLog);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 2000,
    });
    
    console.log('Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.error('Error de autenticación: Verifica que el usuario y contraseña sean correctos');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Error de selección de servidor:', error.reason);
    }
    
    console.error('Asegúrate de que el archivo .env existe y contiene MONGODB_URI correcta');
    console.error('O verifica que la URI hardcodeada sea correcta');
  }
};

// Ejecutar la conexión
connectDB();

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