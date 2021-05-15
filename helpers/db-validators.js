const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    throw new Error(`El rol ${rol} no esta registrado en la BD.`);
  }
};

const emailExists = async (mail = "") => {
  const existeEmail = await User.findOne({ mail });

  if (existeEmail) {
    throw new Error(`El mail ${mail} ya esta registrado en la BD.`);
  }
};

module.exports = {
  isRoleValid,
  emailExists,
};
