const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  const { file } = req.files;

  const nameCut = file.name.split(".");
  const extension = nameCut[nameCut.length - 1];

  //validate extension
  const extesionsAllowed = ["png", "jpg", "jpeg"];

  if (!extesionsAllowed.includes(extension)) {
    res.status(400).json({
      msg: `Extension ${extension} not allowed.`,
    });
  }

  const temporalName = uuidv4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/", temporalName);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to " + uploadPath });
  });
};

module.exports = { uploadFile };
