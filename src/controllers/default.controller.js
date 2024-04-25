const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { defaultService } = require("../services");

const getAllDefault = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await defaultService.queryAllDefault(filter, options);
  res.send(result);
});

const createDefault = catchAsync(async (req, res) => {
  const result = await defaultService.createDefault(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getDefault = catchAsync(async (req, res) => {
  const result = await defaultService.getDefault(req.params.id);
  res.send(result);
});

const updateDefault = catchAsync(async (req, res) => {
  const result = await defaultService.updateDefaultById(
    req.params.id,
    req.body
  );
  res.send(result);
});

const deleteDefault = catchAsync(async (req, res) => {
  await defaultService.deleteDefault(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteDefaultByIds = catchAsync(async (req, res) => {
  await defaultService.deleteDefaultByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverDefaultByIds = catchAsync(async (req, res) => {
  await defaultService.recoverDefaultByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const bulkCreateDefault = catchAsync(async (req, res) => {
  const result = await defaultService.bulkCreateDefault(req.body);
  res.status(200).json(result);
});

module.exports = {
  getAllDefault,
  createDefault,
  getDefault,
  updateDefault,
  deleteDefault,
  deleteDefaultByIds,
  recoverDefaultByIds,
  bulkCreateDefault
};
