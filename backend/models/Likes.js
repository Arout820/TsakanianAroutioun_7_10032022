const database = require('../config/db');

// Class commentaire pour données à envoyer à la BDD
class Likes {
  constructor(post_id, user_id, isLiked) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.isLiked = isLiked;
  }

  save(likes, callback) {
    const sql = 'INSERT INTO likes set ?';
    database.query(sql, likes, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static delete(userId, postId, tokenUserId, callback) {
    const sql = 'DELETE FROM likes WHERE user_id = ? AND post_id = ? AND user_id = ?';
    database.query(sql, [userId, postId, tokenUserId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getFromUser(userId, postId, callback) {
    const sql = 'SELECT * FROM likes WHERE likes.user_id = ? AND likes.post_id = ?';
    database.query(sql, [userId, postId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
}

module.exports = Likes;
