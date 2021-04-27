const { response } = require("express");

const usuariosGet = (req, res = response) => {
  const params = req.query;
  res.json({
    query,
    msg: "get API - controlador",
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;
  res.json({
    ok: true,
    msg: "put API",
    id,
  });
};

const usuariosPost = (req, res) => {
  const { nombre } = req.body;

  res.json({
    msg: "post API",
    nombre,
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
