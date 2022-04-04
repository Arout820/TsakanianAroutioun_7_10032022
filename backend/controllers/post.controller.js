const database = require('../config/db');

// Class post pour données à envoyer à la BDD
class Post {
  constructor(content, user_id) {
    this.content = content;
    this.user_id = user_id;
  }
}

// ----------------------- Créer un post ----------------------- //
exports.createPost = (req, res) => {
  const { content, user_id } = req.body;
  const post = new Post(content, attachment, user_id);
  database.query('INSERT INTO post VALUES(\'\',\''+content+'\',\''+attachment+'\',\'\',\''+user_id+'\' )', post, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(201).json({ error: 'Post crée !' });
  });
};

// ------------------ Récuperer tous les posts ------------------ //
exports.getAllPost = (req, res) => {
  database.query('SELECT * FROM post', (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

// ---------------------- Récuperer un post ---------------------- //
exports.getOnePost = (req, res) => {
  database.query('SELECT * FROM post WHERE post_id = ?', req.params.id, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
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
