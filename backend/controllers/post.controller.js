const fs = require('fs');
const Post = require('../models/Post');
require('dotenv').config();

// ----------------------- Créer un post ----------------------- //
exports.createPost = (req, res) => {
  try {
    const { content, user_id, video, attachment } = req.body;
    if (!req.file) {
      const post = new Post(content, user_id, video, undefined);
      post.save(post, (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Post crée !' });
      });
    } else if (req.file) {
      const attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const post = new Post(content, user_id, undefined, attachment);
      post.save(post, (error, results) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Post avec image crée' });
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ------------------ Récuperer nombres commentaires d'un post ------------------ //
exports.getCommentsFromPost = (req, res) => {
  try {
    Post.getCommentNumber(req.params.postId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ------------------ Récuperer tous les posts ------------------ //
exports.getAllPost = (req, res) => {
  try {
    Post.getAll((error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Récuperer un post ---------------------- //
exports.getOnePost = (req, res) => {
  try {
    Post.getOne(req.params.postId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Modifier un post ---------------------- //
exports.modifyPost = (req, res) => {
  try {
    Post.modify(req.body, req.params.postId, req.token.userId, (error, results) => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ message: "Impossible de modifier le post de quelqu'un d'autre !" });
      }
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      res.status(200).json({ message: 'Post modifié !' });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ---------------------- Supprimer un post ---------------------- //
exports.deletePost = (req, res) => {
  try {
    Post.getAttachment(req.params.postId, (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }
      let attachmentFilename;
      if (results[0]) {
        attachmentFilename = results[0].attachment ? results[0].attachment.split('/images/')[1] : null;
      } else if (!results[0]) {
        return res.status(401).json({ error: 'Accès interdit !' });
      }
      fs.unlink(`images/${attachmentFilename}`, () => {
        if (req.token.isAdmin === 1) {
          Post.deleteAdmin(req.params.postId, (error, results) => {
            if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Aucun post correspondant a ce numéro de post !' });
            }
            if (error) {
              return res.status(400).json({ error });
            }
            res.status(200).json({ message: 'Post supprimé !' });
          });
        } else if (req.token.isAdmin === 0) {
          Post.delete(req.params.postId, req.token.userId, (error, results) => {
            if (results.affectedRows === 0) {
              return res.status(401).json({ error: "Impossible de supprimer le post de quelqu'un d'autre !" });
            }
            if (error) {
              console.log(error);
              return res.status(400).json({ error });
            }
            res.status(200).json({ message: 'Post supprimé !' });
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
