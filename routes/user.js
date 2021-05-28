const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/user");
const {
  isRoleValid,
  emailExists,
  userExistsByID,
} = require("../helpers/db-validators");

const {
  validateJWT,
  isAdminRole,
  hasRole,
  validateChanges,
} = require("../middlewares");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExistsByID),
    check("rol").custom(isRoleValid),
    validateChanges,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de mas de 6 digitos.").isLength({
      min: 6,
    }),
    check("mail", "El correo no es valido").isEmail(),
    check("mail", "El correo no es valido!").custom(emailExists),
    check("role").custom(isRoleValid),
    validateChanges,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE"),
    check("id", "ID invalid").isMongoId(),
    check("id").custom(userExistsByID),
    validateChanges,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
