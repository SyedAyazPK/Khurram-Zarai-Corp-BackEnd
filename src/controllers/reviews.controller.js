const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { reviewService } = require("../services");

const getReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["User", "Product"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await reviewService.queryReviews(filter, options);
  res.send(result);
});

const createReview = catchAsync(async (req, res) => {
  const [review] = await reviewService.createReview(req.body);
  res.status(httpStatus.CREATED).send(review);
});

const getReview = catchAsync(async (req, res) => {
  const review = await reviewService.getReview(req.params.id);
  res.send(review);
});

const updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReviewById(
    req.params.id,
    req.body,
    req.user.id
  );
  res.send(review);
});

const deleteReview = catchAsync(async (req, res) => {
  await reviewService.deleteReview(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteReviewByIds = catchAsync(async (req, res) => {
  await reviewService.deleteReviewByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverReviewByIds = catchAsync(async (req, res) => {
  await reviewService.recoverReviewByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const createReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.createReviews(req.body);
  res.send(reviews);
});

module.exports = {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  deleteReviewByIds,
  recoverReviewByIds,
  createReviews,
};
