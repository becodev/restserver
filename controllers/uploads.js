const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { uploadFiles } = require("../helpers");
const { User, Product } = require("../models");

const uploadFile = async (req, res = response) => {
  try {
    const name = await uploadFiles(req.files);
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImage = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} does not exists.`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} does not exists.`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Ups! I forgot validate this." });
  }

  //clear previous images

  try {
    if (model.img) {
      //delete image from server
      const imgPath = path.join(__dirname, "../uploads", colection, model.img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
  } catch (error) {}

  const name = await uploadFiles(req.files, undefined, colection);
  model.img = name;

  await model.save();

  res.json(model);
};

const showImage = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} does not exists.`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} does not exists.`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Ups! I forgot validate this." });
  }

  //clear previous images

  try {
    if (model.img) {
      //delete image from server
      const imgPath = path.join(__dirname, "../uploads", colection, model.img);
      if (fs.existsSync(imgPath)) {
        return res.sendFile(imgPath);
      }
    }
  } catch (error) {}

  const noImage = path.join(__dirname, "../assets/no-image.jpg");

  res.sendFile(noImage);
};

module.exports = { uploadFile, updateImage, showImage };
