const database = require('../config/db');

// Class commentaire pour données à envoyer à la BDD
class Comment {
  constructor(content, user_id, post_id) {
    this.content = content;
    this.user_id = user_id;
    this.post_id = post_id;
  }

  save(comment, callback) {
    const sql = 'INSERT INTO comment SET ?';
    database.query(sql, comment, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getAll(callback) {
    const sql =
      'SELECT comment_id, post.post_id, comment.content, comment.user_id, comment_create_time, firstname, lastname, user_photo FROM comment JOIN user ON comment.user_id = user.user_id JOIN post ON comment.post_id = post.post_id ORDER BY comment_create_time ASC';
    database.query(sql, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getOne(commentId, callback) {
    const sql =
      'SELECT comment_id, post.post_id, comment.content, comment.user_id, firstname, lastname, user_photo FROM comment JOIN user ON comment.user_id = user.user_id JOIN post ON comment.post_id = post.post_id WHERE comment_id = ?';
    database.query(sql, commentId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static delete(commentId, userId, callback) {
    const sql = 'DELETE FROM comment WHERE comment_id = ? AND user_id = ?';
    database.query(sql, [commentId, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static deleteAdmin(commentId, callback) {
    const sql = 'DELETE FROM comment WHERE comment_id = ?';
    database.query(sql, [commentId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
}

module.exports = Comment;
