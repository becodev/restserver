const { Router } = require("express");
const { check } = require("express-validator");
const { validateChanges } = require("../middlewares/validateChanges");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createCategory } = require("../controllers/categories");

const router = Router();

// {{url}}/api/categories

//get all categories
router.get("/", (req, res) => {
  res.json("get");
});

//get a category by id
router.get("/:id", (req, res) => {
  res.json("get");
});

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
