const express = require("express");
const { cloudinaryController } = require("../../controllers");

const router = express.Router();

router.post("/upload", cloudinaryController.uploadImage);

module.exports = router;
