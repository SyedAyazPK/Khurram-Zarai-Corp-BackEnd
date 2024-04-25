const httpStatus = require("http-status");
const { Category } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Query for Category
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  if (filter.isDeleted) {
    filter.isDeleted = true;
  } else {
    filter.isDeleted = false;
  }
  if (filter.ParentId === "null") {
    filter.ParentId = { $exists: true, $eq: null };
  } 
    options.populate = "ParentId";

  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Create a Category
 * @param {Object} reqBody
 * @returns {Promise<Category>}
 */
const createCategory = async (reqBody) => Category.create(reqBody);

/**
 * Get Category By Id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategory = async (id) =>
  Category.findOne({ _id: id, isDeleted: false });

/**
 *  * Update Category by id
 * @param {ObjectId} CategoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (CategoryId, updateBody) => {
  const category = await getCategory(CategoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 *  * Delete Category by id
 * @param {ObjectId} CategoryId
 * @returns {Promise<Category>}
 */
const deleteCategory = async (CategoryId) => {
  const category = await getCategory(CategoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  Object.assign(category, { isDeleted: true });
  await category.save();
  return category;
};

/**
 * Delete Category by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Category>}
 */
const deleteCategoryByMultipleIds = async (ids) => {
  return Category.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Category by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Category>}
 */
const recoverCategoryByMultipleIds = async (ids) => {
  return Category.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

module.exports = {
  queryCategories,
  createCategory,
  getCategory,
  updateCategoryById,
  deleteCategory,
  deleteCategoryByMultipleIds,
  recoverCategoryByMultipleIds,
};
