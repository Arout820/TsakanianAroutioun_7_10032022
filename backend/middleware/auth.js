const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.user_id && req.body.user_id != userId) {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: 'Requête non authentifiée' });
  }
};
