const database = require('../config/db');

require('dotenv').config();

// Class commentaire pour données à envoyer à la BDD
class Comment {
  constructor(content, user_id, post_id) {
    this.content = content;
    this.user_id = user_id;
    this.post_id = post_id;
  }
}

// ----------------------- Créer un commentaire ----------------------- //
exports.createComment = (req, res) => {
  const { content, user_id, post_id } = req.body;
  const comment = new Comment(content, user_id, post_id);
  database.query('INSERT INTO comment SET ?', comment, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(201).json({ message: 'Commentaire crée !' });
  });
};

// ------------------ Récuperer tous les commentaires ------------------ //
exports.getAllComment = (req, res) => {
  database.query(
    'SELECT comment_id, post.post_id, comment.content, comment.user_id, comment_create_time, firstname, lastname, user_photo FROM comment JOIN user ON comment.user_id = user.user_id JOIN post ON comment.post_id = post.post_id ORDER BY comment_create_time ASC',
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  );
};

// ---------------------- Récuperer un commentaire ---------------------- //
exports.getOneComment = (req, res) => {
  database.query(
    'SELECT comment_id, post.post_id, comment.content, comment.user_id, firstname, lastname, user_photo FROM comment JOIN user ON comment.user_id = user.user_id JOIN post ON comment.post_id = post.post_id WHERE comment_id = ?',
    req.params.commentId,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  );
};

// ---------------------- Supprimer un commentaire ---------------------- //
exports.deleteComment = (req, res) => {
  if (req.token.isAdmin === 1) {
    database.query('DELETE FROM comment WHERE comment_id = ?', [req.params.commentId], (error, results) => {
      console.log(results);
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: 'Aucun commentaire correspondant a ce numéro de commentaire !' });
      }
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      res.status(200).json({ message: 'Commentaire supprimé !' });
    });
  } else if (req.token.isAdmin === 0) {
    database.query(
      'DELETE FROM comment WHERE comment_id = ? AND user_id = ? ',
      [req.params.commentId, req.token.userId],
      (error, results) => {
        console.log(results);
        if (results.affectedRows === 0) {
          return res
            .status(400)
            .json({ message: "Impossible de supprimer le commentaire de quelqu'un d'autre !" });
        }
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        console.log(results);
        res.status(200).json({ message: 'Commentaire supprimé !' });
      }
    );
  }
};
