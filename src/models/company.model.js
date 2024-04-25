const mongoose = require('mongoose')
const  { toJSON, paginate } = require('./plugins');


const companySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [String],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

/**
 * @typedef Company
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
