const { cloudinaryService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const uploadImage = catchAsync(async (req, res) => {
  const { url } = await cloudinaryService.uploadFile(req.files);
  res.send(url);
});

module.exports = {
  uploadImage,
};
