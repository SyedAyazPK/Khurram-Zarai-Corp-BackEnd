const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const defaultSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: mongoose.SchemaTypes.Mixed,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
defaultSchema.plugin(toJSON);
defaultSchema.plugin(paginate);

/**
 * @typedef Default
 */
const Default = mongoose.model("Default", defaultSchema);

module.exports = Default;
