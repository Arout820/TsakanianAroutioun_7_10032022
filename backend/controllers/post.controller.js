const database = require('../config/db');

// Class post pour données à envoyer à la BDD
class Post {
  constructor(content, user_id, attachment) {
    this.content = content;
    this.user_id = user_id;
    this.attachment = attachment;
  }
}

// ----------------------- Créer un post ----------------------- //
exports.createPost = (req, res) => {
  const { content, user_id, attachment } = req.body;
  const post = new Post(content, user_id, attachment);
  database.query('INSERT INTO post SET ?', post, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(201).json({ error: 'Post crée !' });
  });
};

// ------------------ Récuperer tous les posts ------------------ //
exports.getAllPost = (req, res) => {
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

// ---------------------- Récuperer un post ---------------------- //
exports.getOnePost = (req, res) => {
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

// ---------------------- Modifier un post ---------------------- //
exports.modifyPost = (req, res) => {
  database.query('UPDATE post SET ? WHERE post_id = ?', [req.body, req.params.id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    console.log(results);
    res.status(200).json({ message: 'Post modifié !' });
  });
};

// ---------------------- Supprimer un post ---------------------- //
exports.deletePost = (req, res) => {
  database.query('DELETE FROM post WHERE post_id = ?', req.params.id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    console.log(results);
    res.status(200).json({ message: 'Post supprimé !' });
  });
};
