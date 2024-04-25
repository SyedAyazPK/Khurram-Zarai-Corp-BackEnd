const Joi = require("joi");
const { objectId, isValidURL } = require("./custom.validation");

const createDefault = {
  body: Joi.object().keys({
    type: Joi.string().required(),
    value: Joi.any().required(),
  }),
};
const bulkCreateDefault = {
  body: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      value: Joi.any().required(),
    })
  ),
};

const getAllDefault = {
  query: Joi.object().keys({
    type: Joi.string().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDefault = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteDefault = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateDefault = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    type: Joi.string().optional(),
    value: Joi.array().optional(),
  }),
};

const deleteDefaultByIds = {
  body: Joi.object().keys({
    ids: Joi.array().optional(),
  }),
};

module.exports = {
  createDefault,
  getAllDefault,
  getDefault,
  updateDefault,
  deleteDefault,
  deleteDefaultByIds,
  bulkCreateDefault,
};
