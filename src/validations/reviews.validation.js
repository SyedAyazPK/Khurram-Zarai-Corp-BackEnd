const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createReview = {
  body: Joi.object().keys({
    Product: Joi.string().required().custom(objectId),
    rating: Joi.number().min(1).max(5).optional(),
    User: Joi.string().required().custom(objectId),
    comment: Joi.string().required().min(50),
  }),
};
const createReviews = {
  body: Joi.object().keys({
    reviews: Joi.array().items({
      Product: Joi.string().required().custom(objectId),
      rating: Joi.number().min(1).max(5).optional(),
      User: Joi.string().required().custom(objectId),
      comment: Joi.string().required().min(50),
    }),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    Product: Joi.string().optional().custom(objectId),
    User: Joi.string().optional().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getReview = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteReview = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    rating: Joi.number().min(1).max(5).optional(),
    comment: Joi.string().required().min(50),
  }),
};

module.exports = {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
  createReviews,
};
