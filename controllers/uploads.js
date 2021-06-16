const { response } = require("express");
const { uploadFiles } = require("../helpers");

const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  try {
    const name = await uploadFiles(req.files);
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImage = async (req, res = response) => {
  const { colection, id } = req.params;
  res.json({ colection, id });
};

module.exports = { uploadFile, updateImage };
