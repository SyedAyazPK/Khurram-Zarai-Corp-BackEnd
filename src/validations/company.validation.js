const Joi = require("joi");
const { objectId, isValidURL } = require("./custom.validation");

const createCompany = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.array().items(Joi.string().custom(isValidURL)).optional(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    isDeleted: Joi.boolean().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteCompany = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.array().items(Joi.string().custom(isValidURL)).optional(),
  }),
};

const deleteCompanyByIds = {
  body: Joi.object().keys({
    ids: Joi.array().optional(),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyByIds,
};
