const httpStatus = require("http-status");
const { Company } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Query for Company
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCompanies = async (filter, options) => {
  if (filter.isDeleted) {
    filter.isDeleted = true;
  } else {
    filter.isDeleted = false;
  }
 

  const companies = await Company.paginate(filter, options);
  return companies;
};

/**
 * Create a Company
 * @param {Object} reqBody
 * @returns {Promise<Company>}
 */
const createCompany = async (reqBody) => Company.create(reqBody);

/**
 * Get Company By Id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompany = async (id) => Company.findOne({ _id: id, isDeleted: false });

/**
 *  * Update Company by id
 * @param {ObjectId} CompanyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (CompanyId, updateBody) => {
  const company = await getCompany(CompanyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, "company not found");
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 *  * Delete Company by id
 * @param {ObjectId} CompanyId
 * @returns {Promise<Company>}
 */
const deleteCompany = async (CompanyId) => {
  const company = await getCompany(CompanyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, "Company Not Found");
  }
  Object.assign(company, { isDeleted: true });
  await company.save();
  return company;
};

/**
 * Delete Company by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Company>}
 */
const deleteCompanyByMultipleIds = async (ids) => {
  return Company.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Company by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Company>}
 */
const recoverCompanyByMultipleIds = async (ids) => {
  return Company.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

module.exports = {
  queryCompanies,
  createCompany,
  getCompany,
  updateCompanyById,
  deleteCompany,
  deleteCompanyByMultipleIds,
  recoverCompanyByMultipleIds,
};
