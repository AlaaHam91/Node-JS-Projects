let fs = require("fs");
module.exports = {
  addProductPage: (req, res) => {
    res.render("add_product.ejs", {
      message: "",
      title: "App | add product page",
    });
  },
  addProduct: (req, res) => {
    if (!req.files) res.status(400).send("No image sent");

    let category = req.body.category,
      title = req.body.title,
      description = req.body.description,
      quantity = req.body.quantity,
      price = req.body.price,
      uploadedFile = req.files.image;

    let insertQuery =
      "INSERT INTO `product`(`title`, `quantity`, " +
      "`price`, `category`, `image`, `description`)" +
      "VALUES ('" +
      title +
      "'," +
      quantity +
      "," +
      price +
      ",'" +
      category +
      "','" +
      uploadedFile.name +
      "','" +
      description +
      "')";

    db.query(insertQuery, (err, result) => {
      if (err) return res.status(500).send("Error in insert record in DB");

      let message = "New Product inerted successfuly";

      //upload the image

      let fileExtension = uploadedFile.name.split(".")[1];
      let image_name = result.insertId + "." + fileExtension;
      console.log(image_name);
      if (
        uploadedFile.mimetype == "image/png" ||
        uploadedFile.mimetype == "image/jpg" ||
        uploadedFile.mimetype == "image/gif" ||
        uploadedFile.mimetype == "image/jpeg"
      ) {
        uploadedFile.mv("public/assests/images/" + image_name);
        message = message + " and the image upladed";
      } else message = "Invlid file type";

      res.redirect("/");
    });
  },
  editProductPage: (req, res) => {
    let selectQuery =
      "SELECT * FROM `product` where productID=" + req.params.id;
    db.query(selectQuery, (err, result) => {
      if (err) return res.status(500).send(err);
      res.render("edit_product.ejs", {
        message: "No Msg",
        title: "App | Edit page",
        product: result[0],
      });
    });
  },
  editProduct: (req, res) => {
    let category = req.body.category,
      title = req.body.title,
      description = req.body.description,
      quantity = req.body.quantity,
      price = req.body.price,
      uploadedFile = req.files.image;
    productID = req.params.id;

    let updateQuery =
      "UPDATE `product` SET " +
      "`title`='" +
      title +
      "',`quantity`=" +
      quantity +
      "," +
      "`price`=" +
      price +
      ",`category`='" +
      category +
      "',`image`='" +
      uploadedFile.name +
      "',`description`='" +
      description +
      "'" +
      " WHERE `productID`=" +
      productID;

    db.query(updateQuery, (err, result) => {
      if (err) return res.status(500).send(err);
      //upload the image

      let fileExtension = uploadedFile.name.split(".")[1];
      let image_name = productID + "." + fileExtension;
      if (
        uploadedFile.mimetype == "image/png" ||
        uploadedFile.mimetype == "image/jpg" ||
        uploadedFile.mimetype == "image/gif" ||
        uploadedFile.mimetype == "image/jpeg"
      ) {
        uploadedFile.mv("public/assests/images/" + image_name);
        message = "Product with id=" + productID + "has been update";
        res.redirect("/");
      } else {
        message = "Error in update product";

        res.render("add_product.ejs", {
          message: message,
          title: "App | Edit product page",
        });
      }
    });
  },
  deleteProduct: (req, res) => {
    let productID = req.params.id;

    selectQuery = "SELECT `image` from `product` WHERE productID=" + productID;
    deleteQuery = "DELETE FROM `product` WHERE productID=" + productID;
    db.query(selectQuery, (err2, result2) => {
      if (err2) return res.status(500).send(err2);
      else
        db.query(deleteQuery, (err1, result1) => {
          if (err1) return res.status(500).send(err1);
        });
      fs.unlink(
        "public/assests/images" +
          productID +
          "." +
          result2[0].image.split(".")[1],
        (err) => {
          return res.status(500).send(err);
        }
      );
      res.redirect("/");
    });
  },
};
