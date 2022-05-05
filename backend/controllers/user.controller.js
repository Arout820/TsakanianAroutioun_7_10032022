const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/User');

require('dotenv').config();

// -------------------------- S'inscrire -------------------------- //
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User(firstname, lastname, email, hash);
    user.save(user, (error, results) => {
      if (error && error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: { duplicate: 'Utilisateur déjà présent dans la BDD !' } });
      }
      res.status(201).json({ Inscription: user });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// -------------------------- Se connecter -------------------------- //
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    User.connect(email, async (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (results == false) {
        return res.status(401).json({ error: { email: 'Utilisateur non présent !' } });
      }
      const validPassword = await bcrypt.compare(password, results[0].password);
      if (!validPassword) {
        return res.status(401).json({ error: { password: 'Mot de passe incorrect !' } });
      }
      res.status(200).json({
        userId: results[0].user_id,
        isAdmin: results[0].isAdmin,
        token: jwt.sign({ userId: results[0].user_id, isAdmin: results[0].isAdmin }, process.env.TOKEN, {
          expiresIn: '24h',
        }),
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// -------------------------- Récuperer un utilisateur -------------------------- //
exports.getOneUser = (req, res) => {
  try {
    User.getUser(req.params.userId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (results == false) {
        return res.status(400).json({ error: `ID ${req.params.userId} inconnu` });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ----------------------- Mettre à jour un utilisateur ----------------------- //
exports.modifyUser = (req, res) => {
  try {
    if (!req.file && !req.body.oldImage) {
      User.updateInfos(req.body, req.params.userId, (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json(results);
      });
    } else if (req.file || req.body.oldImage) {
      const oldImageName = req.body.oldImage.split('/images/')[1];
      const userPhoto = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : undefined;
      fs.unlink(`images/${oldImageName}`, () => {
        User.updatePhoto(userPhoto, req.params.userId, (error, results) => {
          if (error) {
            return res.status(400).json({ error });
          }
          res.status(200).json(results);
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ----------------------- Supprimer un utilisateur ----------------------- //
exports.deleteUser = (req, res) => {
  try {
    User.getUser(req.params.userId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (results == false) {
        return res.status(400).json({ error: `ID ${req.params.userId} inconnu` });
      }
      const oldImageName = results[0].user_photo.split('/images/')[1];
      fs.unlink(`images/${oldImageName}`, () => {
        User.delete(req.params.userId, (error, results) => {
          if (error) {
            return res.status(400).json({ error });
          }
          res.status(200).json({ message: 'Utilisateur supprimé' });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
