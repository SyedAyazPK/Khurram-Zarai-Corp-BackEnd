const express = require("express");
const auth = require("../../middlewares/auth");
const { defaultController } = require("../../controllers");
const { defaultValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(
    auth(),
    validate(defaultValidation.getAllDefault),
    defaultController.getAllDefault
  )
  .post(
    auth("write"),
    validate(defaultValidation.createDefault),
    defaultController.createDefault
  );

router
  .route("/bulkCreate")
  .post(
    auth("write"),
    validate(defaultValidation.bulkCreateDefault),
    defaultController.bulkCreateDefault
  );

router
  .route("/bulkDelete")
  .post(
    auth(),
    validate(defaultValidation.deleteDefaultByIds),
    defaultController.deleteDefaultByIds
  );

router
  .route("/bulkRecover")
  .post(
    auth(),
    validate(defaultValidation.deleteDefaultByIds),
    defaultController.recoverDefaultByIds
  );

router
  .route("/public")
  .get(
    validate(defaultValidation.getAllDefault),
    defaultController.getAllDefault
  );

router
  .route("/:id")
  .get(
    auth(),
    validate(defaultValidation.getDefault),
    defaultController.getDefault
  )
  .patch(
    auth("edit"),
    validate(defaultValidation.updateDefault),
    defaultController.updateDefault
  )
  .delete(
    auth("delete"),
    validate(defaultValidation.deleteDefault),
    defaultController.deleteDefault
  );

module.exports = router;
