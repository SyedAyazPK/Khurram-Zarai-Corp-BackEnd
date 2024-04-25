const Joi = require("joi");
const { objectId, isValidURL } = require("./custom.validation");

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    sku: Joi.number().required().positive(),
    stock: Joi.number().positive().required(),
    images: Joi.array().items(Joi.string().custom(isValidURL)),
    shortDescription: Joi.string().required(),
    Company: Joi.string().required().custom(objectId),
    Category: Joi.string().required().custom(objectId),
    price: Joi.number().required().positive(),
    discountedPrice: Joi.number().optional().positive().allow(null),
    options: Joi.object()
      .keys({
        packSize: Joi.string().optional(),
        packSizeDescription: Joi.string().optional(),
      })
      .optional(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    title: Joi.string().optional().allow(""),
    sku: Joi.number().optional(),
    isDeleted: Joi.boolean().optional(),
    Company: Joi.string().optional().custom(objectId),
    Category: Joi.string().optional().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    minPrice: Joi.number().integer().positive().optional(),
    maxPrice: Joi.number().integer().positive().optional(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    sku: Joi.number().optional().positive(),
    stock: Joi.number().positive().optional(),
    images: Joi.array().items(Joi.string().custom(isValidURL)).optional(),
    shortDescription: Joi.string().optional(),
    Company: Joi.string().optional().custom(objectId),
    Category: Joi.string().optional().custom(objectId),
    price: Joi.number().optional().positive(),
    discountedPrice: Joi.number().optional().positive().allow(null),
    options: Joi.object()
      .keys({
        packSize: Joi.string().optional(),
        packSizeDescription: Joi.string().optional(),
      })
      .optional(),
  }),
};

const deleteProductByIds = {
  body: Joi.object().keys({
    ids: Joi.array().optional(),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProductByIds,
};
