const express = require("express");
const auth = require("../../middlewares/auth");
const { orderController } = require("../../controllers");
const { orderValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(auth(), validate(orderValidation.getOrders), orderController.getOrders)
  .post(
    // auth("write"),
    validate(orderValidation.createOrder),
    orderController.createOrder
  );

router
  .route("/bulkDelete")
  .post(
    auth(),
    validate(orderValidation.deleteOrderByIds),
    orderController.deleteOrderByIds
  );

router
  .route("/bulkRecover")
  .post(
    auth(),
    validate(orderValidation.deleteOrderByIds),
    orderController.recoverOrderByIds
  );

router
  .route("/public")
  .get(validate(orderValidation.getOrders), orderController.getOrders);

router
  .route("/:id")
  .get(auth(), validate(orderValidation.getOrder), orderController.getOrder)
  .patch(
    auth("edit"),
    validate(orderValidation.updateOrder),
    orderController.updateOrder
  )
  .delete(
    auth("delete"),
    validate(orderValidation.deleteOrder),
    orderController.deleteOrder
  );

module.exports = router;
