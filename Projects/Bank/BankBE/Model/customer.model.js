const mongoose = require("mongoose"),
  schema = mongoose.Schema;

let customerSchema = new schema({
  title: { required: false, type: String, max: 5 },
  custName: { required: true, type: String, max: 100 },
  email: { required: true, type: String, max: 20 },
  phone: { required: true, type: String, max: 20 },
});
module.exports = mongoose.model("Customer", customerSchema,"customer");
