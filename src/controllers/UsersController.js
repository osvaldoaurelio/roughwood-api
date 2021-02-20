const { Op: { or, iLike } } = require('sequelize');
const { hash } = require('bcryptjs');

const User = require('../models/User');

const { userAttr, genColor, genInitials } = require('../utils');

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    try {
      const users = await User.findAll({
        attributes: userAttr,
        where: {
          is_admin: false,
          [or]: [
            { name: { [iLike]: `%${search}%` } },
            { username: { [iLike]: `%${search}%` } },
          ],
        },
        order: [['updated_at', 'DESC']],
      });

      return res.json({ users });
    } catch (err) {
      return res.status(500).json();
    }
  },

  async store(req, res) {
    const {
      name,
      username,
      address = '',
      phone = '',
    } = req.body.user;

    try {
      if (name && username) {
        const existUsername = await User.findOne({ where: { username } });
        if (existUsername) {
          return res.status(400).json({ error: 'Este Username já existe' });
        }
        const user = await User.create({
          name,
          username,
          address,
          phone,
          color: genColor(),
          initials: genInitials(name),
          password: await hash(username, 8),
        });

        return res.status(201).json({ user });
      } else {
        return res.status(400).json({ error: 'Bad request' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        include: { association: 'user_orders' }
      });

      if (user) {
        return res.json({ user });
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },
  
  async orders(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        attributes: userAttr,
        include: [{
          association: 'user_orders',
          include: [
            { association: 'customer' },
            { association: 'employee' },
          ],
        }],
      });

      if (user) {
        return res.json({ user });
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },

  async edit(req, res) {
    const { id } = req.params;

    try {  
      let user = await User.findByPk(id);

      if (user) {
        const { name, address, phone } = req.body.user;

        user.name = name ?? user.name;
        user.address = address ?? user.address;
        user.phone = phone ?? user.phone;
        user.color = genColor(),
        user.initials = genInitials(user.name),

        user = await user.save();

        return res.json({ user });
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },

  async resetPassword(req, res) {
    const { id } = req.params;
    
    try {
      let user = await User.findByPk(id);
      
      if (user) {
        user.is_active = false;
        user.password = await hash(user.username, 8);

        user = await user.save();

        return res.status(200).json({ message: 'ok' });
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }    
    } catch (err) {
      return res.status(500).json();
    }
  },

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      
      if (user) {
        await user.destroy();

        return res.status(204).json();
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },

}
