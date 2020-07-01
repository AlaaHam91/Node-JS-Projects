const express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    fileupload=require("express-fileupload"),
    port=8081;
const customer=require("./Routes/customer.route.js");
const countryCustomer=require("./Routes/countryCustomer.route.js");
const mongoose=require("mongoose");
let db_url="mongodb://localhost:27017/BankDB";
mongoose.connect(db_url);

//old version of monogo db
mongoose.Promise=global.Promise;

const db=mongoose.connection;
db.on("error",console.error.bind(console,"MongoDB connection Error!!"))

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(fileupload());
app.use("/customers",customer);
app.use("/countryCustomers",countryCustomer);

app.use("/images",express.static(__dirname+"/uploaded"));
app.listen(port,()=>{
    console.log("server is runung on port :"+port);
    
});