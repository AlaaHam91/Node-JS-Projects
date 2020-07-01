const express = require("express"),
  app = express(),
  mysql = require("mysql"),
  fileupload = require("express-fileupload"),
  path = require("path"),
  bodyparser = require("body-parser"),
  port = 8081;

app.set("port", process.env.port || port);
console.log("main path: " + __dirname);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(fileupload());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname + "/public")));

const {mainPage}=require("./routes/index");
const {addProductPage,addProduct,editProductPage,editProduct,deleteProduct}=require("./routes/product");


app.get("/",mainPage);
app.get("/add",addProductPage);
app.post("/add",addProduct);
app.get("/edit/:id",editProductPage);
app.post("/edit/:id",editProduct);
app.get("/delete/:id",deleteProduct)


const db=mysql.createConnection({
  host:"localhost",
  password:"root",
  database:"products",
  user:"root"
});


db.connect((err)=>{
  if(err)
    throw err;
    console.log("connect to database successfuly \n")
});

global.db=db;


app.listen(port, () => {
  console.log("Server runing on port" + port);
});
