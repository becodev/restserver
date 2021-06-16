const dbvalidators = require("./db-validators");
const generateJWT = require("./generateJWT");
const uploadFiles = require("./uploadFiles");

module.exports = {
  ...dbvalidators,
  ...generateJWT,
  ...uploadFiles,
};
