const cloudinary = require("cloudinary");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 *
 * @param {Object} files
 * @returns {Promise<String>}
 */
const uploadFile = async (files) => {
  if (!files || !Boolean(Object.keys(files).length))
    throw new ApiError(httpStatus.BAD_REQUEST, "File Not Selected");
  const { file } = files;

  return cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to Upload File"
      );
    }
    return result;
  });
};

module.exports = {
  uploadFile,
};
