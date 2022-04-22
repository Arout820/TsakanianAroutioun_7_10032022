// Class commentaire pour données à envoyer à la BDD
class Comment {
  constructor(content, user_id, post_id) {
    this.content = content;
    this.user_id = user_id;
    this.post_id = post_id;
  }
}

module.exports = Comment;
