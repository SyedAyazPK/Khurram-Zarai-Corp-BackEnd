const express = require("express");
const auth = require("../../middlewares/auth");
const { categoryController } = require("../../controllers");
const { categoryValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(
    auth(),
    validate(categoryValidation.getCategories),
    categoryController.getCategories
  )
  .post(
    auth("write"),
    validate(categoryValidation.createCategory),
    categoryController.createCategory
  );

router
  .route("/bulkDelete")
  .post(
    auth(),
    validate(categoryValidation.deleteCategoryByIds),
    categoryController.deleteCategoryByIds
  );

router
  .route("/bulkRecover")
  .post(
    auth(),
    validate(categoryValidation.deleteCategoryByIds),
    categoryController.recoverCategoryByIds
  );

router
  .route("/public")
  .get(
    validate(categoryValidation.getCategories),
    categoryController.getCategories
  );

router
  .route("/:id")
  .get(
    auth(),
    validate(categoryValidation.getCategory),
    categoryController.getCategory
  )
  .patch(
    auth("edit"),
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
  )
  .delete(
    auth("delete"),
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategory
  );

module.exports = router;
