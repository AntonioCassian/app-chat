import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = dados;
    req.userId = id;
    req.userName = username;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
};
