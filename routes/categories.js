const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateJWT,
  validateChanges,
  isAdminRole,
} = require("../middlewares/");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { categoryExist } = require("../helpers/db-validators");

const router = Router();

//get all categories
router.get("/", getCategories);

//get a category by id
router.get(
  "/:id",
  [
    check("id", "Not valid mongo id").isMongoId(),
    check("id").custom(categoryExist),
    validateChanges,
  ],
  getCategory
);

//create a new category,  private.
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateChanges,
  ],
  createCategory
);

//update category by id, private.
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required."),
    check("id").custom(categoryExist),
    validateChanges,
  ],
  updateCategory
);

//delete a category by id , only ADMIN_ROLE
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id").custom(categoryExist),
    check("id", "Not valid mongo ID"),
    validateChanges,
  ],
  deleteCategory
);

module.exports = router;
