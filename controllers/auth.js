const { response } = require("express");

const login = (req, res = response) => {
  res.json({
    msg: "login ok",
  });
};

module.exports = {
  login,
};
