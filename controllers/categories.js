const { response } = require("express");
const { Category } = require("../models");

//obtenerCategorias - paginado - total - populate
const getCategories = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

// obtenerCategoria - populate {}
const getCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name");

  res.json({
    category,
  });
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.name}, already exists.`,
    });
  }

  //generate data to save.
  const data = {
    name,
    user: req.user._id,
  };

  //save to DB
  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

// actualizarCategoria
const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

// borrarCategoria (estado false)
const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(deletedCategory);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
