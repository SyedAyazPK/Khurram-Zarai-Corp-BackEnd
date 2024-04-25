const express = require("express");
const auth = require("../../middlewares/auth");
const { productController } = require("../../controllers");
const { productValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(
    auth(),
    validate(productValidation.getProducts),
    productController.getProducts
  )
  .post(
    auth("write"),
    validate(productValidation.createProduct),
    productController.createProduct
  );

router
  .route("/bulkDelete")
  .post(
    auth(),
    validate(productValidation.deleteProductByIds),
    productController.deleteProductByIds
  );

router
  .route("/bulkRecover")
  .post(
    auth(),
    validate(productValidation.deleteProductByIds),
    productController.recoverProductByIds
  );

router
  .route("/public")
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route("/:id")
  .get(
    // auth(),
    validate(productValidation.getProduct),
    productController.getProduct
  )
  .patch(
    auth("edit"),
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(
    auth("delete"),
    validate(productValidation.deleteProduct),
    productController.deleteProduct
  );

module.exports = router;
