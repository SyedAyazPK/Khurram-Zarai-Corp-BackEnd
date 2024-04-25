const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { companyService } = require("../services");

const getCompanies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["title"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await companyService.queryCompanies(filter, options);
  res.send(result);
});

const createCompany = catchAsync(async (req, res) => {
  const company = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(company);
});

const getCompany = catchAsync(async (req, res) => {
  const company = await companyService.getCompany(req.params.id);
  res.send(company);
});

const updateCompany = catchAsync(async (req, res) => {
  const company = await companyService.updateCompanyById(
    req.params.id,
    req.body
  );
  res.send(company);
});

const deleteCompany = catchAsync(async (req, res) => {
  await companyService.deleteCompany(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteCompanyByIds = catchAsync(async (req, res) => {
  await companyService.deleteCompanyByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

const recoverCompanyByIds = catchAsync(async (req, res) => {
  await companyService.recoverCompanyByMultipleIds(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyByIds,
  recoverCompanyByIds,
};
