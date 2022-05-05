const Likes = require('../models/Likes');
require('dotenv').config();

// ----------------------- Créer un like ----------------------- //
exports.createLikes = (req, res) => {
  try {
    const { post_id, user_id, isLiked } = req.body;
    if (isLiked === 1) {
      const likes = new Likes(post_id, user_id, isLiked);
      likes.save(likes, (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Like crée !' });
      });
    } else {
      return res.status(400).json({ error: 'Pour liker il vaut que la valeur soit égale à 1.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Supprimer un like ---------------------- //
exports.deleteLikes = (req, res) => {
  try {
    const { userId, postId, isLiked } = req.params;
    if (parseInt(isLiked) === 0) {
      Likes.delete(userId, postId, req.token.userId, (error, results) => {
        if (results.affectedRows === 0) {
          return res.status(401).json({ error: 'Erreur like indisponible' });
        }
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ message: 'Like supprimé !' });
      });
    } else {
      return res.status(400).json({ error: 'Pour supprimer un like il faut que la valeur transmise soit égale à 0' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Récupérer likes pour utilisateur
exports.getLikesFromUser = (req, res) => {
  try {
    const { userId, postId } = req.params;
    Likes.getFromUser(userId, postId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(201).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
