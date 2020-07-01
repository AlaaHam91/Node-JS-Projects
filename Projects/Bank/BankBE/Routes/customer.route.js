const express=require("express"),
    
      router=express.Router(); //or router=express();

const customer_controller=require("../Controller/customer.controller");
router.get("/test",customer_controller.test);
router.post("/create",customer_controller.create);
router.get("/:id",customer_controller.find);
router.put("/:id/update",customer_controller.update);
router.delete("/:id/delete",customer_controller.delete);

module.exports=router;