const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const usuariosPut = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, mail, ...rest } = req.body;

  //validar contra DB
  if (password) {
    //encriptar la password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
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

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  const uid = req.uid;

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json(user);
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
