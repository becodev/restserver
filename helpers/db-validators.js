const { Category, Role, User, Product } = require("../models");

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

const userExistsByID = async (id) => {
  const userExistis = await User.findById(id);

  if (!userExistis) {
    throw new Error(`El ID ${id} no existe en la BD.`);
  }
};

// existe categoria?
const categoryExist = async (id) => {
  const isCategory = await Category.findById(id);

  if (!isCategory) {
    throw new Error(`Category ${id} does not exists.`);
  }
};

//existe producto?
const productExist = async (id) => {
  const isProduct = await Product.findById(id);

  if (!isProduct || isProduct.status === false) {
    throw new Error(`Product ${id} does not exists.`);
  }
};

//validate colections
const colectionsAllowed = (colection = "", colections = []) => {
  const included = colections.includes(colection);

  if (!included) {
    throw new Error(`Colection ${colection} not allowed. ${colections}`);
  }

  return true;
};

module.exports = {
  isRoleValid,
  emailExists,
  userExistsByID,
  categoryExist,
  productExist,
  colectionsAllowed,
};
