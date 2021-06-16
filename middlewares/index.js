const validateJWT = require("./validate-jwt");
const validateRoles = require("./validate-roles");
const validateChanges = require("./validateChanges");
const validateFile = require("./validateFile");

module.exports = {
  ...validateJWT,
  ...validateChanges,
  ...validateRoles,
  ...validateFile,
};
