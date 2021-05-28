const validateJWT = require("./validate-jwt");
const validateRoles = require("./validate-roles");
const validateChanges = require("./validateChanges");

module.exports = {
  ...validateJWT,
  ...validateChanges,
  ...validateRoles,
};
