const { Op: { or, iLike } } = require('sequelize');

const StockMaterial = require('../models/StockMaterial');

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    try {
      const stock_materials = await StockMaterial.findAll({
        where: {
          [or]: [
            { name: { [iLike]: `%${search}%` } },
            { supplier_name: { [iLike]: `%${search}%` } },
            { description: { [iLike]: `%${search}%` } },
          ],
        },
        order: [
          ['is_active', 'DESC'],
          ['updated_at', 'DESC'],
        ],
      });

      return res.json({ stock_materials });
    } catch (err) {
      return res.status(500).json();
    }
  },

  async active(req, res) {
    try {
      const stock_materials = await StockMaterial.findAll({
        where: { is_active: true},
        order: [['name', 'ASC']],
      });

      return res.json({ stock_materials });
    } catch (err) {
      console.log(err);
      return res.status(500).json();
    }
  },

  async store(req, res) {
    const {
      name,
      supplier_name,
      price,
      description = '',
      is_active,
    } = req.body.stock_material;

    try {
      if (name && supplier_name && price) {
        const existName = await StockMaterial.findOne({ where: { name, supplier_name } });
        if (existName) {
          return res.status(400).json({ error: 'Este produto já existe' });
        }
        const stock_material = await StockMaterial.create({
          name,
          supplier_name,
          price,
          description,
          is_active
        });

        return res.status(201).json({ stock_material });
      } else {
        return res.status(400).json({ error: 'Bad request' });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json();
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const stock_material = await StockMaterial.findByPk(id);

      if (stock_material) {
        return res.json({ stock_material });
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
      let stock_material = await StockMaterial.findByPk(id);

      if (stock_material) {
        const { price, description, is_active } = req.body.stock_material;

        stock_material.supplier_name = supplier_name ?? stock_material.supplier_name;
        stock_material.description = description ?? stock_material.description;
        stock_material.is_active = is_active ?? stock_material.is_active;
        stock_material.price = price ?? stock_material.price;

        stock_material = await stock_material.save();

        return res.json({ stock_material });
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
      const stock_material = await StockMaterial.findByPk(id);
      
      if (stock_material) {
        await stock_material.destroy();

        return res.status(204).json();
      } else {
        return res.status(404).json({ error: 'Not Found' });
      }
    } catch (err) {
      return res.status(500).json();
    }
  },

}
