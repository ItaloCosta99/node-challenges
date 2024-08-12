const path = require("path");
const { body } = require("express-validator");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim().withMessage("Title must be at least 3 characters long."),
    body("imageUrl").isURL().withMessage("Please enter a valid URL."),
    body("price").isFloat().withMessage("Please enter a valid price."),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("Description must be between 5 and 400 characters."),
  ],
  isAuth,
  adminController.postAddProduct,
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim().withMessage("Title must be at least 3 characters long."),
    body("imageUrl").isURL().withMessage("Please enter a valid URL."),
    body("price").isFloat().withMessage("Please enter a valid price."),
    body("description").isLength({ min: 5, max: 400 }).trim().withMessage("Description must be between 5 and 400 characters."),
  ],
  isAuth,
  adminController.postEditProduct,
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
