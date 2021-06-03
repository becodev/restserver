const { response } = require("express");
const { Category } = require("../models");

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

module.exports = { createCategory };
