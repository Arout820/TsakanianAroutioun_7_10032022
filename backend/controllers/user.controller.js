const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../config/db');

require('dotenv').config();

// Class user pour données à envoyer à la BDD
class User {
  constructor(firstname, lastname, email, password, bio, user_photo) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.bio = bio;
    this.user_photo = user_photo;
  }
}

// -------------------------- S'inscrire -------------------------- //
exports.signup = (req, res) => {
  const { firstname, lastname, email, password, bio, user_photo } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(firstname, lastname, email, hash, bio, user_photo);

      console.log(user);

      database.query('INSERT INTO user  SET ?', user, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: user.user_id });
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

// -------------------------- Récuperer tous les utilisateurs -------------------------- //
exports.getAllUser = (req, res) => {
  database.query('SELECT * FROM user', (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

// -------------------------- Récuperer un utilisateur -------------------------- //
exports.getOneUser = (req, res) => {
  database.query('SELECT * FROM user WHERE user_id = ?', req.params.id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    if (results == false) {
      return res.status(400).json({ error: `ID ${req.params.id} inconnu` });
    }
    res.status(200).json(results);
  });
};

// ----------------------- Mettre à jour un utilisateur ----------------------- //
exports.modifyUser = (req, res) => {
  
  const { firstname, lastname, email, password, bio, user_photo } = req.body;
  console.log('reqqqq');
  console.log(req.body);
  database.query('UPDATE user SET ? WHERE user_id = ?', [req.body, req.params.id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

// ----------------------- Supprimer un utilisateur ----------------------- //
exports.deleteUser = (req, res) => {
  database.query('DELETE FROM user WHERE user_id = ?', req.params.id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    console.log(results);
    res.status(200).json({ message: 'Utilisateur supprimé' });
  });
};
