const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: [
      {
        image: String,
        title: String,
        description: String,
      },
    ],
    ParentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 */
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
