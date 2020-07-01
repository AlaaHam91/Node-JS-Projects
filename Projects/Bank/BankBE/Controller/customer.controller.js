const Customer = require("../Model/customer.model");

exports.test = (req, res) => {
  res.send("Test Controller");
};

exports.create = (req, res) => {
  let customer = new Customer({
    title: req.body.title,
    custName: req.body.custName,
    phone: req.body.phone,
    email: req.body.email,
  });
  customer.save((err) => {
    if (err) return res.send(err);
    res.send("customer created successfuly");
  });
};

exports.find=(req,res)=>{
    Customer.findById(req.params.id,(err,customer)=>{
        if(err) return res.send(err);
        else
          res.send(customer);
    });

};

exports.update=(req,res)=>{
  Customer.findByIdAndUpdate(req.params.id,{$set:req.body},(err,customer)=>{
      if(err) return res.send(err);
      else
      res.send("customer updated successfuly")
  })
};


exports.delete=(req,res)=>{
  Customer.findOneAndDelete(req.params.id,(err,customer)=>{
      if(err) return res.send(err);
      else
      res.send("customer deleted successfuly")
  })
};