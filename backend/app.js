const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Connexion à la base de donnée
require('./config/db');

// Application express connecté
const app = express();
console.log('Connecté au serveur');

// permet de débloquer le fait que le front et le back proviennent de sources différentes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// permet d'analyser le corps de la requête en le transformant en json
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
