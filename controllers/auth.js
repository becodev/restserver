const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    //email verification
    const user = await User.findOne({ mail });

    if (!user) {
      return res.status(400).json({
        msg: "User / password incorrect.",
      });
    }

    //user verification
    if (!user.status) {
      return res.status(400).json({
        msg: "User doesn't exists.",
      });
    }

    //pass verification
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / password incorrect.",
      });
    }

    //generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error",
    });
  }
};

module.exports = {
  login,
};
