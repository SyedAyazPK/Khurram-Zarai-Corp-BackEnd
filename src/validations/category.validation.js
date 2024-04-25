const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    banner: Joi.array()
      .items({
        image: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
      })
      .optional(),
    ParentId: Joi.string().custom(objectId).optional().allow(null),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    ParentId: Joi.string().optional(),
    isDeleted: Joi.boolean().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    banner: Joi.array()
      .items({
        image: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
      })
      .optional(),
    ParentId: Joi.string().custom(objectId).optional().allow(null),
  }),
};

const deleteCategoryByIds = {
  body: Joi.object().keys({
    ids: Joi.array().optional(),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryByIds,
};
