const httpStatus = require("http-status");
const { Order, Default } = require("../models");
const ApiError = require("../utils/ApiError");
const Product = require("../models/product.model");
const { emailService } = require("./index");
const { pdfGenerator } = require("./pdf.service");

/**
 * Query for Order
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  if (filter.isDeleted) {
    filter.isDeleted = true;
  } else {
    filter.isDeleted = false;
  }
  options.populate = "User,products.ProductId";
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Send Email Order
 * @param {Object} orderBody
 * @param {Product[]} totalProducts
 * @returns {Promise}
 */
const sendEmailOrder = async (orderBody, totalProducts) => {
  const adminEmail = await Default.findOne({ type: "email" });
  const updatedData = {
    ...orderBody,
    products: totalProducts,
  };
  const generatePdf = await pdfGenerator(updatedData);
  await Promise.all([
    emailService.sendEmail(
      orderBody.guestInfo?.email,
      "Your Order Has Been Placed",
      " ",
      generatePdf
    ),
    emailService.sendEmail(
      adminEmail.value,
      "Your Order Has Been Placed",
      " ",
      generatePdf
    ),
  ]);
};

/**
 * Create a Order
 * @param {Object} reqBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  let price = 0;
  const totalProducts = [];
  for (let i = 0; i < orderBody.products.length; i++) {
    let product = await Product.findOne({
      _id: orderBody.products[i].ProductId,
    });
    totalProducts.push(product);
    if (product) {
      let totalPrice =
        (product.discountedPrice || product.price) *
        orderBody.products[i].quantity;
      price = price + totalPrice;
    }
  }
  orderBody.price = price;
  // await sendEmailOrder(orderBody, totalProducts);
  return Order.create(orderBody);
};
/**
 * Get Order By Id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrder = async (id) => Order.findOne({ _id: id, isDeleted: false });

/**
 *  * Update Order by id
 * @param {ObjectId} OrderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (OrderId, updateBody) => {
  const order = await getOrder(OrderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "order not found");
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 *  * Delete Order by id
 * @param {ObjectId} OrderId
 * @returns {Promise<Order>}
 */
const deleteOrder = async (OrderId) => {
  const order = await getOrder(OrderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
  }
  Object.assign(order, { isDeleted: true });
  await order.save();
  return order;
};

/**
 * Delete Order by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Order>}
 */
const deleteOrderByMultipleIds = async (ids) => {
  return Order.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: true } },
    { multi: true }
  );
};
/**
 * Recover Order by id
 * @param {ObjectId[]} ids
 * @returns {Promise<Order>}
 */
const recoverOrderByMultipleIds = async (ids) => {
  return Order.updateMany(
    { _id: { $in: ids } },
    { $set: { isDeleted: false } },
    { multi: true }
  );
};

module.exports = {
  queryOrders,
  createOrder,
  getOrder,
  updateOrderById,
  deleteOrder,
  deleteOrderByMultipleIds,
  recoverOrderByMultipleIds,
};
