const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // BASED ON CLIENT REQUIREMENT SKU CONVERTED INTO NUMBER
    sku: {
      // type:String,
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
    shortDescription: {
      type: String,
      required: true,
    },
    Company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Company",
      required: true,
    },
    Category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
    options: {
      packSize: {
        type: String,
        required: false,
      },
      packSizeDescription: {
        type: String,
        required: false,
      },
    },
    reviews: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Review",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
