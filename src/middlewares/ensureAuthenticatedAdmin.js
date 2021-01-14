const { verify } = require('jsonwebtoken');

const { jwt } = require('../config/app');

const ensureAuthenticatedAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ error: 'JWT token is missing' });
  }

  const [, token] = authorization.split(' ');
  const { secret } = jwt;

  try {
    const { sub } = verify(token, secret);  
    const [id, is_admin, is_active] = sub.split('-');
console.log(is_admin);
    if (is_admin == 'false') {
      return res.status(403).json({ error: 'Você não é admin' });
    }
    if (is_active == 'false') {
      return res.status(403).json({ error: 'Usuário não ativo no sistema' });
    }

    req.user_admin = { id };
  
    return next();
    
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: 'Invalid JWT token' });
  }

};

module.exports = ensureAuthenticatedAdmin;