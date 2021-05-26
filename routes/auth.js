const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateChanges } = require("../middlewares/validateChanges");

const router = Router();

router.post(
  "/login",
  [
    check("mail", "Mail error").isEmail(),
    check("password", "Password error").not().isEmpty(),
    validateChanges,
  ],
  login
);

module.exports = router;
