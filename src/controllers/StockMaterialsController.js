const StockMaterial = require('../models/StockMaterial');

module.exports = {
  async list(req, res) {
    const stockMaterials = await StockMaterial.findAll();

    return res.json({ stockMaterials });
  },

  async store(req, res) {
    const { name, description, quantity = 1, is_active = true } = req.body.stockMaterial;

    if (name) {
      const stockMaterial = await StockMaterial.create({ name, description, quantity, is_active });

      return res.status(201).json({ stockMaterial });
    } else {
      return res.status(400).json({ error: 'Bad request!' });
    }    
  },

  async show(req, res) {
    const { id } = req.params;

    const stockMaterial = await StockMaterial.findByPk(id);

    if (stockMaterial) {
      return res.json({ stockMaterial });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    
    let stockMaterial = await StockMaterial.findByPk(id);
    
    if (stockMaterial) {
      const { name, description, quantity, is_active } = req.body.stockMaterial;

      stockMaterial.name = name ?? stockMaterial.name;
      stockMaterial.description = description ?? stockMaterial.description;
      stockMaterial.quantity = quantity ?? stockMaterial.quantity;
      stockMaterial.is_active = is_active ?? stockMaterial.is_active;

      stockMaterial = await stockMaterial.save();

      return res.json({ stockMaterial });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.params;

    const stockMaterial = await StockMaterial.findByPk(id);
    
    if (stockMaterial) {
      await stockMaterial.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

}
