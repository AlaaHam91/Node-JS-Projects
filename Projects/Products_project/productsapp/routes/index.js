module.exports = {
  mainPage: (req, res) => {

    let selectQuery="SELECT * FROM `product`";
    db.query(selectQuery,(err,result)=>{
      if(err)
        return res.status(500).send(err);
        res.render("index.ejs", {
          title: "APP | View Products ",
          products: result,
        });
    });


   
  },
};
