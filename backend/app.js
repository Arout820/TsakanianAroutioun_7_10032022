const express = require('express');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const likesRoutes = require('./routes/likes.routes')

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

// multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/post/likes', likesRoutes);

module.exports = app;
