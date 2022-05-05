const database = require('../config/db');

// Class user pour données à envoyer à la BDD
class Post {
  constructor(content, user_id, video, attachment) {
    this.content = content;
    this.user_id = user_id;
    this.video = video;
    this.attachment = attachment;
  }

  save(post, callback) {
    const sql = 'INSERT INTO post set ?';
    database.query(sql, post, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getCommentNumber(postId, callback) {
    const sql =
      'SELECT COUNT(*) as post_comments, post.post_id FROM post JOIN comment ON post.post_id = comment.post_id WHERE post.post_id = ?';
    database.query(sql, postId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getAll(callback) {
    const sql =
      'SELECT (SELECT COUNT(*) FROM likes WHERE likes.post_id = post.post_id) as post_likes_number, post_id, content, attachment, video, post_create_time, post.user_id, firstname, lastname, user_photo, isAdmin FROM post JOIN user ON post.user_id = user.user_id ORDER BY post_create_time DESC';
    database.query(sql, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getOne(postId, callback) {
    const sql =
      'SELECT post_id, content, attachment, post_create_time, post.user_id, firstname, lastname, user_photo, isAdmin FROM post JOIN user ON post.user_id = user.user_id WHERE post_id = ?';
    database.query(sql, postId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static modify(body, postId, userId, callback) {
    const sql = 'UPDATE post SET ? WHERE post_id = ? AND user_id = ?';
    database.query(sql, [body, postId, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getAttachment(postId, callback) {
    const sql = 'SELECT attachment FROM post WHERE post_id = ?';
    database.query(sql, postId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static deleteAdmin(postId, callback) {
    const sql = 'DELETE FROM post WHERE post_id = ?';
    database.query(sql, postId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
  static delete(postId, tokenUserId, callback) {
    const sql = 'DELETE FROM post WHERE post_id = ? AND user_id = ?';
    database.query(sql, [postId, tokenUserId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
}

module.exports = Post;
