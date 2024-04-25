const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "isEmailVerified", "isDeleted"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.user.id,
    req.body
  );
  res.send(user);
});

module.exports = {
  getUsers,
  deleteUser,
  updateUser
};
