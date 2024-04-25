const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { orderService } = require("../services");

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["type", "User"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const createOrder = catchAsync(async (req, res) => {
  const product = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getOrder = catchAsync(async (req, res) => {
  const product = await orderService.getOrder(req.params.id);
  res.send(product);
});

const updateOrder = catchAsync(async (req, res) => {
  const product = await orderService.updateOrderById(req.params.id, req.body);
  res.send(product);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteOrderByIds = catchAsync(async (req, res) => {
  await orderService.deleteOrderByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverOrderByIds = catchAsync(async (req, res) => {
  await orderService.recoverOrderByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  deleteOrderByIds,
  recoverOrderByIds,
};
