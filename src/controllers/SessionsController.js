const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const User = require('../models/User');

const config = require('../config/app');

module.exports = {
  async createAdmin(req, res) {
    const { username, password } = req.body.session;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Not found!' });
    }
    if (!user.is_admin) {
      return res.status(404).json({ error: 'Not found!' });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Not found!' });
    }

    const { secret, expiresIn } = config.jwt;
    const token = sign({}, secret, {
      subject: `${user.id}-${user.is_admin}-${user.is_active}`,
      expiresIn,
    });

    return res.json({ user, token });
  },

  async createUser(req, res) {
    const { username, password } = req.body.session;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Not found!' });
    }
    if (user.is_admin) {
      return res.status(404).json({ error: 'Not found!' });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Not found!' });
    }

    const { secret, expiresIn } = config.jwt;
    const token = sign({}, secret, {
      subject: `${user.id}-${user.is_admin}-${user.is_active}`,
      expiresIn,
    });

    return res.json({ user, token });
  },
}
