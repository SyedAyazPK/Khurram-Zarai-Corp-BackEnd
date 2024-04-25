const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getUsers = {
  query: Joi.object().keys({
    isDeleted: Joi.boolean().default(false).optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
  }),
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
};
