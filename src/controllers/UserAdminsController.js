const { hash } = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, username, password } = req.body.user;

    if (name && username && password) {
      const existUsername = await User.findOne({ where: { username } });
      if (existUsername) {
        return res.status(400).json({ error: 'Este Username já existe' });
      }
      const user = await User.create({
        name,
        username,
        password: await hash(password, 8),
        is_active: true,
        is_admin: true,
      });

      return res.status(201).json({ user });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }    
  },

  async me(req, res) {
    const { id } = req.user_admin;

    const user = await User.findByPk(id);

    if (user) {
      return res.json({ user });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

  async edit(req, res) {
    const { id } = req.user_admin;
    
    let user = await User.findByPk(id);
    
    if (user) {
      const { name } = req.body.user;

      user.name = name ?? user.name;

      user = await user.save();

      return res.json({ user });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.user_admin;

    const user = await User.findByPk(id);
    
    if (user) {
      await user.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

}
