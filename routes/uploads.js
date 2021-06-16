const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateImage } = require("../controllers/uploads");
const { colectionsAllowed } = require("../helpers");
const { validateChanges } = require("../middlewares/validateChanges");

const router = Router();

router.post("/", uploadFile);

router.put(
  "/:colection/:id",
  [
    check("id", "The ID shoud be mongo id.").isMongoId(),
    check("colection").custom((c) =>
      colectionsAllowed(c, ["users", "products"])
    ),
    validateChanges,
  ],
  updateImage
);

module.exports = router;
