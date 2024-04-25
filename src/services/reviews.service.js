const httpStatus = require("http-status");
const { Review, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

/**
 * Query for Review
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReviews = async (filter, options) => {
  options.populate = "Product,User";
  const reviews = await Review.paginate(filter, options);
  return reviews;
};

/**
 * Create a Review
 * @param {Object} reqBody
 * @returns {Promise<Array>}
 */
const createReview = async (reqBody) => {
  const reviewId = new mongoose.Types.ObjectId();
  return await Promise.all([
    Review.create({ _id: reviewId, ...reqBody }),
    Product.findByIdAndUpdate(reqBody.Product, {
      $push: { reviews: reviewId },
    }),
  ]);
};

/**
 * Create Reviews
 * @param {Object} reqBody
 * @returns {Promise<Array>}
 */
const createReviews = async (reqBody) => {
  const reviews = [];
  for (let i = 0; i < reqBody.reviews.length; i++) {
    const [review] = await createReview(reqBody.reviews[i]);
    reviews.push(review);
  }
  return { reviews };
};

/**
 * Get Review By Id
 * @param {ObjectId} id
 * @returns {Promise<Review>}
 */
const getReview = async (id) => Review.findOne({ _id: id, isDeleted: false });

/**
 *  * Update Review by id
 * @param {ObjectId} ReviewId
 * @param {Object} updateBody
 * @returns {Promise<Review>}
 */
const updateReviewById = async (ReviewId, updateBody, UserId) => {
  const review = await getReview(ReviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "review not found");
  } else if (review.User != UserId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Author can only edit");
  }
  Object.assign(review, updateBody);
  await review.save();
  return review;
};

/**
 *  * Delete Review by id
 * @param {ObjectId} ReviewId
 * @returns {Promise<Review>}
 */
const deleteReview = async (ReviewId) => {
  const review = await getReview(ReviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review Not Found");
  }
  Object.assign(review, { isDeleted: true });
  await review.save();
  return review;
};

/**
 * Delete Review by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Review>}
 */
const deleteReviewByMultipleIds = async (ids) => {
  return Review.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Review by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Review>}
 */
const recoverReviewByMultipleIds = async (ids) => {
  return Review.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

module.exports = {
  queryReviews,
  createReview,
  getReview,
  updateReviewById,
  deleteReview,
  deleteReviewByMultipleIds,
  recoverReviewByMultipleIds,
  createReviews,
};
