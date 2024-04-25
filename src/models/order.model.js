const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");
const validator = require("validator");
const order = require("../constants/order");
const paymentMethods = require("../constants/paymentMethods");

const orderSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: roles,
      default: "guest",
    },
    guestInfo: {
      name: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
          }
        },
      },
      phone: {
        type: String,
        required: false,
        trim: true,
        min: 10,
        max: 20,
      },
    },
    User: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: false,
    },
    products: [
      {
        ProductId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    price: {
      type: Number,
      required: false,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(paymentMethods),
      defaultValue: paymentMethods.CASH_ON_DELIVERY,
    },
    status: {
      type: String,
      enum: Object.values(order),
      default: order.PARTIAL,
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
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
