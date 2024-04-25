const express = require("express");
const auth = require("../../middlewares/auth");
const { userController } = require("../../controllers");
const { userValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(auth(), validate(userValidation.getUsers), userController.getUsers);

router
  .route("/:id")
  .delete(
    auth(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)

module.exports = router;
