const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Product, Category } = require("../models");

const collectionsAllowed = ["users", "category", "products"];

const findUsers = async (term = "", res = response) => {
  /**
   * Funcion para buscar usuarios en la DB,
   * primero busca por ID de mongo, si lo que recibe no es un ID
   * se usa una expresion regular con el termino de busqueda recibido
   * y se utiliza el metodo find() en el modelo User, buscando por nombre
   * o email, validando que el status en la DB sea true.
   */

  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const user = await User.findById(term);

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { mail: regex }],
    $and: [{ status: true }],
  });

  res.json({
    total: users.length,
    results: users,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Allowed collections: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      findUsers(term, res);
      break;
    case "category":
      break;
    case "products":
      break;

    default:
      res.status(500).json({
        msg: `I forgot to do this search :(`,
      });
  }

  // res.json({ collection, term });
};

module.exports = { search };
