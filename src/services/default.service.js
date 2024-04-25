const httpStatus = require("http-status");
const { Default } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Query for Default
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllDefault = async (filter, options) => {
  const allDefaults = await Default.paginate(filter, options);
  return allDefaults;
};

/**
 * Create a Default
 * @param {Object} reqBody
 * @returns {Promise<Default>}
 */
const createDefault = async (reqBody) => {
  const findDefault = await Default.findOne({ type: reqBody.type });
  if (findDefault) {
    Object.assign(findDefault, reqBody);
    await findDefault.save();
    return findDefault;
  } else return await Default.create(reqBody);
};

/**
 * Get Default By Id
 * @param {ObjectId} id
 * @returns {Promise<Default>}
 */
const getDefault = async (id) => Default.findOne({ _id: id, isDeleted: false });

/**
 *  * Update Default by id
 * @param {ObjectId} DefaultId
 * @param {Object} updateBody
 * @returns {Promise<Default>}
 */
const updateDefaultById = async (DefaultId, updateBody) => {
  const category = await getDefault(DefaultId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Default not found");
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 *  * Delete Default by id
 * @param {ObjectId} DefaultId
 * @returns {Promise<Default>}
 */
const deleteDefault = async (DefaultId) => {
  const category = await getDefault(DefaultId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Default Not Found");
  }
  Object.assign(category, { isDeleted: true });
  await category.save();
  return category;
};

/**
 * Delete Default by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Default>}
 */
const deleteDefaultByMultipleIds = async (ids) => {
  return Default.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Default by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Default>}
 */
const recoverDefaultByMultipleIds = async (ids) => {
  return Default.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

const bulkCreateDefault = async (reqBody) => {
  const results = [];
  for (let i = 0; i < reqBody.length; i++) {
    results.push(await createDefault(reqBody[i]));
  }
  return results;
};

module.exports = {
  queryAllDefault,
  createDefault,
  getDefault,
  updateDefaultById,
  deleteDefault,
  deleteDefaultByMultipleIds,
  recoverDefaultByMultipleIds,
  bulkCreateDefault,
};
