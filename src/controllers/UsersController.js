const { hash } = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  async list(req, res) {
    const users = await User.findAll({
      attributes: ['id'],
    });
    console.log(users.length, users.reduce((previus, current) => ([...previus, current.id]), []));
    return res.json({ users });
  },

  async store(req, res) {
    const { name, username, password } = req.body.user;

    if (name && username && password) {
      const existUsername = await User.findOne({ where: { username } });
      if (existUsername) {
        return res.status(400).json({ error: 'This username already exist!' });
      }
      const user = await User.create({
        name,
        username,
        password: await hash(password, 8),
      });

      return res.status(201).json({ user });
    } else {
      return res.status(400).json({ error: 'Bad request!' });
    }    
  },

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: { association: 'user_orders' }
    });

    if (user) {
      return res.json({ user });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    
    let user = await User.findByPk(id);
    
    if (user) {
      const { name, is_active } = req.body.user;

      user.name = name ?? user.name;
      user.is_active = is_active ?? user.is_active;

      user = await user.save();

      return res.json({ user });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);
    
    if (user) {
      await user.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

}
