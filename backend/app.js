const express = require('express');
const userRoutes = require('./routes/user.routes');

// Connexion à la base de donnée
require('./config/db');

// Application express connecté
const app = express();
console.log('Connecté au serveur');

// permet d'analyser le corps de la requête en le transformant en json
app.use(express.json());

// Routes
// app.use('/api/auth', userRoutes);

module.exports = app;
