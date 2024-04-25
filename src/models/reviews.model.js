const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const reviewsSchema = mongoose.Schema(
  {
    Product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    User: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reviewsSchema.plugin(toJSON);
reviewsSchema.plugin(paginate);

/**
 * @typedef Reviews
 */
const Reviews = mongoose.model("Review", reviewsSchema);

module.exports = Reviews;
