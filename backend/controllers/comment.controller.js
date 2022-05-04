const database = require('../config/db');
const Comment = require('../models/Comment');

require('dotenv').config();

// ----------------------- Créer un commentaire ----------------------- //
exports.createComment = (req, res) => {
  try {
    const { content, user_id, post_id } = req.body;
    const comment = new Comment(content, user_id, post_id);
    comment.save(comment, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(201).json({ message: 'Commentaire crée !' });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ------------------ Récuperer tous les commentaires ------------------ //
exports.getAllComment = (req, res) => {
  try {
    Comment.getAll((error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Récuperer un commentaire ---------------------- //
exports.getOneComment = (req, res) => {
  try {
    Comment.getOne(req.params.commentId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Supprimer un commentaire ---------------------- //
exports.deleteComment = (req, res) => {
  try {
    if (req.token.isAdmin === 1) {
      Comment.deleteAdmin(req.params.commentId, (error, results) => {
      if (results.affectedRows === 0) {
          return res.status(400).json({ error: 'Aucun commentaire correspondant à ce numéro de commentaire !' });
        }
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ message: 'Commentaire supprimé !' });
      });
    } else if (req.token.isAdmin === 0) {
      Comment.delete(req.params.commentId, req.token.userId, (error, results) => {
        if (results.affectedRows === 0) {
          return res.status(400).json({ error: "Impossible de supprimer le commentaire de quelqu'un d'autre !" });
        }
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ message: 'Commentaire supprimé !' });
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
