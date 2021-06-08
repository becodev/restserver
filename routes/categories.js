const { Router } = require("express");
const { check } = require("express-validator");
const { validateChanges } = require("../middlewares/validateChanges");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../controllers/categories");
const { categoryExist } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/categories
//[ check('id').custom(existeCategoria)]
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
router.put("/:id", (req, res) => {
  res.json("put");
});

//delete a category by id , only ADMIN_ROLE
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
