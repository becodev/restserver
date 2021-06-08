const { response } = require("express");
const { query } = require("express-validator");
const Product = require("../models/product");

//devuelve todos los productos
const getProducts = async (req, res = response) => {
  const { limit = 10, skip = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

//devueleve producto por id
//TODO: verificar que el status sea true.
const getProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

//crea producto
const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${body.name} already exists in DB.`,
    });
  }

  //generate data object to save in DB.
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

//actualiza producto
const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

//elimina producto
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(productDeleted);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
