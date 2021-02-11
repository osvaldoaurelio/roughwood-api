const UsedMaterial = require('../models/UsedMaterial');

module.exports = {
  async list(req, res) {
    const usedMaterials = await UsedMaterial.findAll();

    return res.json({ usedMaterials });
  },

  async store(req, res) {
    const { name, description, quantity = 1, is_active = true } = req.body.usedMaterial;

    if (name) {
      const usedMaterial = await UsedMaterial.create({ name, description, quantity, is_active });

      return res.status(201).json({ usedMaterial });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }    
  },

  async show(req, res) {
    const { id } = req.params;

    const usedMaterial = await UsedMaterial.findByPk(id);

    if (usedMaterial) {
      return res.json({ usedMaterial });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    
    let usedMaterial = await UsedMaterial.findByPk(id);
    
    if (usedMaterial) {
      const { name, description, quantity, is_active } = req.body.usedMaterial;

      usedMaterial.name = name ?? usedMaterial.name;
      usedMaterial.description = description ?? usedMaterial.description;
      usedMaterial.quantity = quantity ?? usedMaterial.quantity;
      usedMaterial.is_active = is_active ?? usedMaterial.is_active;

      usedMaterial = await usedMaterial.save();

      return res.json({ usedMaterial });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.params;

    const usedMaterial = await UsedMaterial.findByPk(id);
    
    if (usedMaterial) {
      await usedMaterial.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

}
