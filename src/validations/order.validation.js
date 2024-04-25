const Joi = require("joi");
const { objectId, isValidURL } = require("./custom.validation");
const { roles } = require("../config/roles");
const order = require("../constants/order");

const createOrder = {
  body: Joi.object().keys({
    type: Joi.string()
      .valid(...roles)
      .optional(),
    guestInfo: Joi.object()
      .keys({
        name: Joi.string().optional(),
        street: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().min(10).max(20).optional(),
      })
      .optional(),
    User: Joi.string().custom(objectId).optional(),
    products: Joi.array()
      .items({
        ProductId: Joi.string().custom(objectId).optional(),
        quantity: Joi.number().optional().positive(),
      })
      .required(),
    status: Joi.string()
      .valid(...Object.values(order))
      .optional(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    type: Joi.string().optional(),
    User: Joi.string().optional().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    type: Joi.string()
      .valid(...roles)
      .optional(),
    guestInfo: Joi.object()
      .keys({
        name: Joi.string().optional(),
        street: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().min(10).max(20).optional(),
      })
      .optional(),
    User: Joi.string().custom(objectId).optional(),
    products: Joi.array()
      .items({
        ProductId: Joi.string().custom(objectId).optional(),
        quantity: Joi.number().optional().positive(),
      })
      .optional(),
    status: Joi.string()
      .valid(...Object.values(order))
      .optional(),
  }),
};

const deleteOrderByIds = {
  body: Joi.object().keys({
    ids: Joi.array().optional(),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  deleteOrderByIds,
};
