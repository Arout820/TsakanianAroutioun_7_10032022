const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../config/db');
const User = require('../models/User');

require('dotenv').config();

// -------------------------- S'inscrire -------------------------- //
exports.signup = (req, res) => {
  const { username, email, password, bio } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(username, email, hash, bio);

      console.log(user);

      database.query('INSERT INTO user  SET ?', user, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Utilisateur enregistré !' });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// -------------------------- Se connecter -------------------------- //
exports.login = (req, res) => {
  const { email, password } = req.body;
  database.query('SELECT * FROM user WHERE email = ?', email, (error, results) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (results == false) {
      return res.status(404).json({ error: 'Utilisateur non présent !' });
    }

    bcrypt
      .compare(password, results[0].password)
      .then((validPassword) => {
        if (!validPassword) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: results[0].user_id,
          token: jwt.sign({ userId: results[0].user_id }, process.env.TOKEN, {
            expiresIn: '24h',
          }),
        });
        console.log('Utilisateur connecté !');
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// -------------------------- Récuper tout les comptes -------------------------- //
exports.getAllAccount = (req, res) => {
  database.query('SELECT * FROM user', (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

// -------------------------- Récuperer un compte -------------------------- //

exports.getAccount = (req, res) => {
  database.query('SELECT * FROM user WHERE user_id = ?', req.url.split('/')[2], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};
