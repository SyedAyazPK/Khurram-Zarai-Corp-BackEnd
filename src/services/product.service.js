const httpStatus = require("http-status");
const { Product } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Query for Product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  if (filter.isDeleted) {
    filter.isDeleted = true;
  } else {
    filter.isDeleted = false;
  }
  if (filter.title && Boolean(filter.title.length))
    filter.title = { $regex: filter.title, $options: "i" };
  else delete filter.title;
  if (filter.minPrice || filter.maxPrice) {
    if (!filter.minPrice) filter.price = { $lte: filter.maxPrice };
    else if (!filter.maxPrice) filter.price = { $gte: filter.minPrice };
    else filter.price = { $lte: filter.maxPrice, $gte: filter.minPrice };
    delete filter.maxPrice;
    delete filter.minPrice;
  }
  options.populate = "Company,Category,reviews";

  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Create a Product
 * @param {Object} reqBody
 * @returns {Promise<Product>}
 */
const createProduct = async (reqBody) => {
  const findSku = await Product.findOne({ sku: reqBody.sku });
  if (findSku) throw new ApiError(httpStatus.BAD_REQUEST, "Sku Must Be Unique");
  return Product.create(reqBody);
};
/**
 * Get Product By Id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProduct = async (id) =>
  Product.findOne({ _id: id, isDeleted: false })
    .populate("Company")
    .populate({
      path: "Category",
      populate: {
        path: "ParentId",
      },
    })
    .populate({
      path: "reviews",
    });

/**
 *  * Update Product by id
 * @param {ObjectId} ProductId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (ProductId, updateBody) => {
  const product = await getProduct(ProductId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 *  * Delete Product by id
 * @param {ObjectId} ProductId
 * @returns {Promise<Product>}
 */
const deleteProduct = async (ProductId) => {
  const product = await getProduct(ProductId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found");
  }
  Object.assign(product, { isDeleted: true });
  await product.save();
  return product;
};

/**
 * Delete Product by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Product>}
 */
const deleteProductByMultipleIds = async (ids) => {
  return Product.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Product by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Product>}
 */
const recoverProductByMultipleIds = async (ids) => {
  return Product.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

/**
 * Get Categories Against Brands
 * @param {string} BrandId
 * @returns {Promise<Product>}
 */
// const

module.exports = {
  queryProducts,
  createProduct,
  getProduct,
  updateProductById,
  deleteProduct,
  deleteProductByMultipleIds,
  recoverProductByMultipleIds,
};
