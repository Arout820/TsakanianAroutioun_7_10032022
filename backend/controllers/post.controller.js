const database = require('../config/db');
const fs = require('fs');

require('dotenv').config();

// ----------------------- Créer un post ----------------------- //
exports.createPost = (req, res) => {
  const { content, user_id, video } = req.body;
  if (!req.file) {
    database.query(
      'INSERT INTO post (content, user_id, video) VALUES (?, ?, ?)',
      [content, user_id, video],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Post crée !' });
      }
    );
  } else if (req.file) {
    const attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    database.query(
      'INSERT INTO post (content, user_id, attachment) VALUES (?, ?, ?)',
      [content, user_id, attachment],
      (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ message: 'Post avec image crée' });
      }
    );
  }
};

// ------------------ Récuperer tous les posts ------------------ //
exports.getAllPost = (req, res) => {
  database.query(
    'SELECT post_id, content, attachment, video, post_create_time, post.user_id, firstname, lastname, user_photo, isAdmin FROM post JOIN user ON post.user_id = user.user_id ORDER BY post_create_time DESC',
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  );
};

// ---------------------- Récuperer un post ---------------------- //
exports.getOnePost = (req, res) => {
  database.query(
    'SELECT post_id, content, attachment, post_create_time, post.user_id, firstname, lastname, user_photo, isAdmin FROM post JOIN user ON post.user_id = user.user_id WHERE post_id = ?',
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

// ---------------------- Modifier un post ---------------------- //
exports.modifyPost = (req, res) => {
  database.query(
    'UPDATE post SET ? WHERE post_id = ? AND user_id = ?',
    [req.body, req.params.id, req.token.userId],
    (error, results) => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: "Impossible de modifier le post de quelqu'un d'autre !" });
      }
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      res.status(200).json({ message: 'Post modifié !' });
    }
  );
};

// ---------------------- Supprimer un post ---------------------- //
exports.deletePost = (req, res) => {
  database.query(
    'SELECT attachment FROM post WHERE post_id = ?',
    [req.params.postId, req.token.userId],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      let attachmentFilename;
      if (results[0]) {
        attachmentFilename = results[0].attachment ? results[0].attachment.split('/images/')[1] : null;
      } else if (!results[0]) {
        return res.status(404).json({ error: 'Accès interdit !' });
      }

      fs.unlink(`images/${attachmentFilename}`, () => {
        if (req.token.isAdmin === 1) {
          database.query(
            'DELETE FROM post WHERE post_id = ?',
            [req.params.postId, req.token.userId],
            (error, results) => {
              if (results.affectedRows === 0) {
                return res.status(400).json({ message: 'Aucun post correspondant a ce numéro de post !' });
              }
              if (error) {
                console.log(error);
                return res.status(400).json({ error });
              }
              console.log(results);
              res.status(200).json({ message: 'Post supprimé !' });
            }
          );
        } else if (req.token.isAdmin === 0) {
          database.query(
            'DELETE FROM post WHERE post_id = ? AND user_id = ? ',
            [req.params.postId, req.token.userId],
            (error, results) => {
              if (results.affectedRows === 0) {
                return res
                  .status(400)
                  .json({ error: "Impossible de supprimer le post de quelqu'un d'autre !" });
              }
              if (error) {
                console.log(error);
                return res.status(400).json({ error });
              }
              console.log(results);
              res.status(200).json({ message: 'Post supprimé !' });
            }
          );
        }
      });
    }
  );
};
