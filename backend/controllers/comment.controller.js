const database = require('../config/db');
const jwt = require('jsonwebtoken');

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
  const comment = new Comment(content, user_id, attachment);
  database.query('INSERT INTO post SET ?', post, (error, results) => {
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
    'SELECT post_id, content, attachment, post_create_time, post.user_id, firstname, lastname, isAdmin FROM post JOIN user ON post.user_id = user.user_id',
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
    'SELECT post_id, content, attachment, post_create_time, post.user_id, firstname, lastname, isAdmin FROM post JOIN user ON post.user_id = user.user_id WHERE post_id = ?',
    req.params.id,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  );
};

// ---------------------- Modifier un commentaire ---------------------- //
exports.modifyCommentaire = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  database.query(
    'UPDATE post SET ? WHERE post_id = ? AND user_id = ?',
    [req.body, req.params.id, userId],
    (error, results) => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: "Impossible de modifier le commentaire de quelqu'un d'autre !" });
      }
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      res.status(200).json({ message: 'Commentaire modifié !' });
    }
  );
};

// ---------------------- Supprimer un commentaire ---------------------- //
exports.deleteComment = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  database.query(
    'DELETE FROM post WHERE post_id = ? AND user_id = ? ',
    [req.params.id, userId],
    (error, results) => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: "Impossible de supprimer le commentaire de quelqu'un d'autre !" });
      }
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      res.status(200).json({ message: 'Commentaire supprimé !' });
    }
  );
};
