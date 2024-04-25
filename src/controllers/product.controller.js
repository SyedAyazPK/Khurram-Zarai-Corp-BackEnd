const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { productService } = require("../services");

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    "title",
    "sku",
    "Company",
    "Category",
    "isDeleted",
    "minPrice",
    "maxPrice",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.id,
    req.body
  );
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteProductByIds = catchAsync(async (req, res) => {
  await productService.deleteProductByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverProductByIds = catchAsync(async (req, res) => {
  await productService.recoverProductByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProductByIds,
  recoverProductByIds,
};
