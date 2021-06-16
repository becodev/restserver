const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFiles = (
  files,
  extesionsAllowed = ["png", "jpg", "jpeg"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const nameCut = file.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    if (!extesionsAllowed.includes(extension)) {
      return reject(`Extension ${extension} not allowed.`);
    }

    const temporalName = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      temporalName
    );

    file.mv(uploadPath, (err) => {
      if (err) reject(err);

      resolve(temporalName);
    });
  });
};

module.exports = {
  uploadFiles,
};
