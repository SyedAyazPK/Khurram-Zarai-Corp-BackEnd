const express = require("express");
const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");
const companyRoute = require("./company.route");
const productRoute = require("./product.route");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");
const cloudinaryRoute = require("./cloudinary.route");
const defaultRoute = require("./default.route");
const reviewsRoute = require("./reviews.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/company",
    route: companyRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/cloudinary",
    route: cloudinaryRoute,
  },
  {
    path: "/default",
    route: defaultRoute,
  },
  {
    path: "/reviews",
    route: reviewsRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
