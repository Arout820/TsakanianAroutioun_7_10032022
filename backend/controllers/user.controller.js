const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const database = require('../config/db');
const { User, addUser } = require('../models/User');

require('dotenv').config();

// -------------------------- S'inscrire -------------------------- //
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User(firstname, lastname, email, hash);
    console.log(user);
    addUser(user);
    res.status(201).json({ Inscription: user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// -------------------------- Se connecter -------------------------- //
exports.login = (req, res) => {
  const { email, password } = req.body;
  database.query('SELECT * FROM user WHERE email = ?', email, (error, results) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (results == false) {
      return res.status(401).json({ error: { email: 'Utilisateur non présent !' } });
    }

    bcrypt
      .compare(password, results[0].password)
      .then((validPassword) => {
        if (!validPassword) {
          return res.status(401).json({ error: { password: 'Mot de passe incorrect !' } });
        }
        res.status(200).json({
          userId: results[0].user_id,
          isAdmin: results[0].isAdmin,
          token: jwt.sign(
            { userId: results[0].user_id, isAdmin: results[0].isAdmin },
            process.env.TOKEN,
            {
              expiresIn: '24h',
            }
          ),
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
  if (!req.file) {
    database.query(
      'UPDATE user SET ? WHERE user_id = ?',
      [req.body, req.params.id],
      (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json(results);
      }
    );
  } else if (req.file) {
    const userPhoto = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const oldImageName = req.body.oldImage.split('/images/')[1];
    fs.unlink(`images/${oldImageName}`, () => {
      database.query(
        'UPDATE user SET user_photo = ? WHERE user_id = ?',
        [userPhoto, req.params.id],
        (error, results) => {
          if (error) {
            return res.status(400).json({ error });
          }
          res.status(200).json(results);
        }
      );
    });
  }
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
