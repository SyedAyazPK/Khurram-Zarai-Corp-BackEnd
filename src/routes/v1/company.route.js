const express = require("express");
const auth = require("../../middlewares/auth");
const { companyController } = require("../../controllers");
const { companyValidation } = require("../../validations");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get(
    auth(),
    validate(companyValidation.getCompanies),
    companyController.getCompanies
  )
  .post(
    auth("write"),
    validate(companyValidation.createCompany),
    companyController.createCompany
  );

router
  .route("/bulkDelete")
  .post(
    auth(),
    validate(companyValidation.deleteCompanyByIds),
    companyController.deleteCompanyByIds
  );

router
  .route("/bulkRecover")
  .post(
    auth(),
    validate(companyValidation.deleteCompanyByIds),
    companyController.recoverCompanyByIds
  );

router
  .route("/public")
  .get(
    validate(companyValidation.getCategories),
    companyController.getCompanies
  );

router
  .route("/:id")
  .get(
    auth(),
    validate(companyValidation.getCompanies),
    companyController.getCompany
  )
  .patch(
    auth("edit"),
    validate(companyValidation.updateCompany),
    companyController.updateCompany
  )
  .delete(
    auth("delete"),
    validate(companyValidation.deleteCompany),
    companyController.deleteCompany
  );

module.exports = router;
