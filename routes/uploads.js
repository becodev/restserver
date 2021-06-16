const { Router } = require("express");
const { check } = require("express-validator");
const {
  uploadFile,
  showImage,
  updateImageCloudinary,
} = require("../controllers/uploads");
const { colectionsAllowed } = require("../helpers");
const { validateChanges, validateFile } = require("../middlewares");

const router = Router();

router.post("/", validateFile, uploadFile);

router.put(
  "/:colection/:id",
  [
    validateFile,
    check("id", "The ID shoud be mongo id.").isMongoId(),
    check("colection").custom((c) =>
      colectionsAllowed(c, ["users", "products"])
    ),
    validateChanges,
  ],
  updateImageCloudinary
);

router.get(
  "/:colection/:id",
  [
    check("id", "The ID shoud be mongo id.").isMongoId(),
    check("colection").custom((c) =>
      colectionsAllowed(c, ["users", "products"])
    ),
    validateChanges,
  ],
  showImage
);

module.exports = router;
