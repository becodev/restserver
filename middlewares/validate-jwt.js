const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There's no token in your request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer usuario que corresponde al uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token invalid. User does not exists in DB",
      });
    }

    //verificar si el uid es True
    if (!user.status) {
      return res.status(401).json({
        msg: "Token invalid. User with status: False",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token invalid",
    });
  }
};

module.exports = { validateJWT };
