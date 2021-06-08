const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  validateJWT,
  validateChanges,
  isAdminRole,
} = require("../middlewares/");
const { categoryExist, productExist } = require("../helpers/db-validators");

const router = Router();

//get all productos
router.get("/", getProducts);

//get product by ID
router.get(
  "/:id",
  [
    check("id", "Thats not a valid mongo ID").isMongoId(),
    check("id").custom(productExist),
    validateChanges,
  ],
  getProduct
);

//create product
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Thats not a valid mongo ID").isMongoId(),
    check("category").custom(categoryExist),
    validateChanges,
  ],
  createProduct
);

//update product
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Thats not a valid mongo ID").isMongoId(),
    check("id").custom(productExist),
    validateChanges,
  ],
  updateProduct
);

//delete product
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Thats not a valid mongo ID").isMongoId(),
    check("id").custom(productExist),
    validateChanges,
  ],
  deleteProduct
);

module.exports = router;
