// Cargar dotenv al principio absoluto del archivo con path explícito
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config');

// Para depuración - muestra si la variable de entorno se cargó
console.log('Entorno:', process.env.NODE_ENV);
console.log('MONGODB_URI definido:', !!process.env.MONGODB_URI);

const app = express();

// Security middleware
app.use(helmet());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: config.security.cors.origin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.security.rateLimit.windowMs,
  max: config.security.rateLimit.max,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/agents', require('./routes/agent.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});