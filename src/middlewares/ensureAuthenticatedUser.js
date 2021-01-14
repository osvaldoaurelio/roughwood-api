const { verify } = require('jsonwebtoken');

const { jwt } = require('../config/app');

const ensureAuthenticatedUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ error: 'JWT token is missing' });
  }

  const [, token] = authorization.split(' ');
  const { secret } = jwt;

  try {
    const { sub } = verify(token, secret);
    const [id, is_admin, is_active] = sub.split('-');

    if (is_admin == 'true') {
      return res.status(403).json({ error: 'Você é admin' });
    }
    if (is_active == 'false') {
      // return res.status(403).json({ error: 'Usuário não ativo no sistema' });
    }
  
    req.user = { id };
    
    return next();

  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: 'Invalid JWT token' });
  }

};

module.exports = ensureAuthenticatedUser;
