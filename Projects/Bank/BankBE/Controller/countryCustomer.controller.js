const CountryCustomers = require("../Model/countryCustomer.model");

exports.countryCreate = (req, res) => {
  let country = new CountryCustomers({
    country: req.body.country,
    customers: [],
  });
  country.save((err) => {
    if (err) return res.send(err);
    // console.log(req.body.country);
   return res
      .status(200)
      .json({ msg: "country creteated successfuly", success: true });
  });
};
exports.countryDetails = (req, res) => {
  let query = CountryCustomers.find(null);
  // query.where("age").gt(10).lt(40);
  //query.where("country").in(["Lebanon","Syria"]);
  //query.where("country,city").equals("Syria");
  //query.sort({city:1});
  //query.limit(10);
  //query.find({'county':'Daraa'})
  query.select("country");
  query.exec((err, countries) => {
    if (err) return err;
    res.status(200).json({ sucess: true, data: countries });
  });
};
exports.countryFind = (req, res) => {
  CountryCustomers.findById(req.params.id, (err, customers) => {
    if (err) return err;
    res.status(200).json({ data: customers, sucess: true });
  });
};
exports.countryUpdate = (req, res) => {
  CountryCustomers.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (err, country) => {
      if (err) return err;
      res.status(200).json({ data: country, sucess: true });
    }
  );
};
exports.countryDelete = (req, res) => {
  CountryCustomers.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) return err;
    res.status(200).json({ msg: "deleted successfuly", sucess: true });
  });
};
exports.customerCreate = (req, res) => {
  //push to array
  CountryCustomers.updateOne(
    { _id: req.params.id },
    {
      $push: {
        customers: {
          custNo: req.body.custNo,
          custName: req.body.custName,
          title: req.body.title,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
          blocked: false,
        },
      },
    },
    (err) => {
      if (err) return err;
      res
        .status(200)
        .json({ msg: "customer created successfuly", sucess: true });
    }
  );
};
exports.customerUpdate = (req, res) => {
  //console.log("id: "+JSON.stringify( req.params))
 

  CountryCustomers.updateOne(
    { _id: req.params.id, "customers.custNo": req.params.custNo },
    {
      $set: {
        "customers.$.custName": req.body.custName,
        "customers.$.phone": req.body.phone,
        "customers.$.email": req.body.email,
        "customers.$.title": req.body.title,
        "customers.$.custNo": req.body.custNo,
        "customers.$.gender": req.body.gender,
        "customers.$.blocked": false,
      },
    },
    (err) => {
      if (err) return err;
      res
        .status(200)
        .json({ msg: "customer updated successfuly", sucess: true });
    }
  );
};
exports.customerDelete = (req, res) => {
  CountryCustomers.updateOne(
    { _id: req.params.id },
    { $pull: { customers: { custNo: req.params.custNo } } },
    { multi: false },
    (err) => {
      if (err) return err;
      res
        .status(200)
        .json({ msg: "customer deleted successfuly", sucess: true });
    }
  );
};
exports.customerAddImg = (req, res) => {
  // img = JSON.stringify(req.body.custImg);
  //img = img.substr(2, img.length - 4);
  if (req.files) {
    //if we need save the uploaded image
    req.files.imgFile.mv("uploaded/" + req.params.custNo + ".jpg", (err) => {
      if (err) return res.status(500).send(err);
    });

    CountryCustomers.updateOne(
      { _id: req.params.id, "customers.custNo": req.params.custNo },
      {
        $set: {
          // "customer.custImg": img,
          "customers.$.custImg": req.files.imgFile.data
         // "customer.$.custImg": req.body

        },
      },
      (err) => {
        if (err) return err;
        res.status(200).json({ msg: "img uploaded successfuly", sucess: true });
      }
    );
  }
};

exports.customerDetails = (req, res) => {
  let query = CountryCustomers.find({
    _id: req.params.id,
    "customers.custNo": req.params.custNo,
  });
  query.exec(query, (err, customer) => {
    if (err) return err;
    res.status(200).json({ data: customer, sucess: true });
  });
};

exports.countries_customers_details = (req, res) => {
  let query = CountryCustomers.find(null);
  query.exec((err, allData) => {
    if (err) return err;
    res.status(200).json({ sucess: true, customersData: allData });
  });
};
