const express=require("express");
const router=express.Router();

const counrtyCustomer=require("../Controller/countryCustomer.controller");

//country
router.post("/countryCreate",counrtyCustomer.countryCreate);
router.get("/getCountries/:anyparam",counrtyCustomer.countryDetails);
router.get("/:id",counrtyCustomer.countryFind);
router.put("/:id/update",counrtyCustomer.countryUpdate);
router.delete("/:id/delete",counrtyCustomer.countryDelete);

//customers
router.put("/addCustomer/:id",counrtyCustomer.customerCreate);
router.put("/updateCustomer/:id/:custNo/update",counrtyCustomer.customerUpdate);
router.delete("/deleteCustomer/:id/:custNo/delete",counrtyCustomer.customerDelete);
router.put("/addCustomerImg/:id/:custNo",counrtyCustomer.customerAddImg);
router.get("/getCustomerDetails/:id/:custNo",counrtyCustomer.customerDetails);

router.get("/getAllCustomers/:anyParam",counrtyCustomer.countries_customers_details);
module.exports=router;

