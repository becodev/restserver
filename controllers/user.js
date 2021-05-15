const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req, res = response) => {
  const params = req.query;
  res.json({
    query,
    msg: "get API - controlador",
  });
};

const usuariosPut = async (req, res) => {
  const id = req.params.id;
  const { password, google, mail, ...rest } = req.body;

  //validar contra DB
  if (password) {
    //encriptar la password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: "put API",
    user,
  });
};

const usuariosPost = async (req, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  //encriptar la password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // guardar en db

  await user.save();

  res.json({
    user,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete API",
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "patch API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
