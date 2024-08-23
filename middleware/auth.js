const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      status: 'Forbidden',
      message: 'No token provided',
      statusCode: 403
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Failed to authenticate token',
        statusCode: 401
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
