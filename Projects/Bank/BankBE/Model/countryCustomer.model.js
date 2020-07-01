const mongoose = require("mongoose");
const schema = mongoose.Schema;

let countryCustomerschema = new schema({
  country: { type: String, require, max: 50 },
  customers: [
    {
      email: {
        require: [true, "email is required"],
        type: String,
        minlength: 15,
        maxlength: 60,
      },
      custNo: { type: String },
      custName: { type: String },
      title: { type: String, max: 5 },
      phone: { type: String, max: 15 },
      gender: {
        type: String,
        max: 1,
        require: () => {
          return this.gender == "M" || this.gender == "F";
        },
      },
      custImg: { type: Buffer },
      blocked: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model(
  "countryCustomers",
  countryCustomerschema,
  "countryCustomers"
);
