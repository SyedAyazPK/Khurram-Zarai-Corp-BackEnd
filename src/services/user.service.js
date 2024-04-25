const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  if (await User.isPhoneTaken(userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Phone already taken");
  }
  return User.create(userBody);
};

/**
 * Query for User
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  if (filter.isDeleted) {
    filter.isDeleted = true;
  } else {
    filter.isDeleted = false;
  }

  const users = await User.paginate(filter, options);
  return users;
};

/**
 * get user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const getUserById = (userId) => User.findOne({ _id: userId });

/**
 * update user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const updateUser = async (userId, sessionUserId, userBody) => {
  if (userBody.email && (await User.isEmailTaken(userBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  if (userBody.phone && (await User.isPhoneTaken(userBody.phone))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Phone already taken");
  }
  if (userId != sessionUserId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized unable to update account"
    );
  }
 return await User.findByIdAndUpdate(userId, userBody);
};
/**
 * delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUser = async (userId, sessionUserId) => {
  if (userId != sessionUserId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized unable to delete account"
    );
  }
  await User.deleteOne({ _id: userId });
};

module.exports = {
  getUserByEmail,
  createUser,
  queryUsers,
  getUserById,
  deleteUser,
  updateUser,
};
