const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { categoryService } = require("../services");

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["title","ParentId"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategory(req.params.id);
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(
    req.params.id,
    req.body
  );
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteCategoryByIds = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverCategoryByIds = catchAsync(async (req, res) => {
  await categoryService.recoverCategoryByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryByIds,
  recoverCategoryByIds,
};
