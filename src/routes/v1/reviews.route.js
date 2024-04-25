const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { reviewsValidation } = require("../../validations");
const { reviewController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(
    auth(),
    validate(reviewsValidation.getReviews),
    reviewController.getReviews
  )
  .post(
    auth(),
    validate(reviewsValidation.createReview),
    reviewController.createReview
  );

router
  .route("/addBulk")
  .post(auth(), validate(reviewsValidation.createReviews), reviewController.createReviews);

router
  .route("/:id")
  .get(
    auth(),
    validate(reviewsValidation.getReview),
    reviewController.getReviews
  )
  .patch(
    auth(),
    validate(reviewsValidation.updateReview),
    reviewController.updateReview
  )
  .delete(
    auth(),
    validate(reviewsValidation.deleteReview),
    reviewController.deleteReview
  );

module.exports = router;
