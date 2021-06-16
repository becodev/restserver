const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const { uploadFiles } = require("../helpers");
const { User, Product } = require("../models");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFile = async (req, res = response) => {
  try {
    const name = await uploadFiles(req.files);
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImageCloudinary = async (req, res = response) => {
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

  if (model.img) {
    //delete image from cloudinary
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;

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

module.exports = { uploadFile, showImage, updateImageCloudinary };
