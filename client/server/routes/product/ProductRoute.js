const express = require("express");
const router = express.Router();

const Product = require("../../controller/product/Product");
const Imagefile = require("../../middelware/Imagefile");

router.route("/adminlogin").post(Product.admin);
router.route("/getdata").get(Product.getProductData);
router.route("/deletedata/:id").delete(Product.deleteData);
router
  .route("/adddata")
  .post(Imagefile.location.single("image"), Product.addnewdata);
router
  .route("/updatedata/:id")
  .put(Imagefile.location.single("image"), Product.updateData);

router.route("/getproductbycate").get(Product.getProductbycate);
router.route("/deleteproductbycate/:id").delete(Product.deleteProductbycate);
router
  .route("/updateproductbycate/:id")
  .put(Imagefile.location.single("image"), Product.updateProductbycate);
router
  .route("/addproductbycate")
  .post(Imagefile.location.single("image"), Product.addnewProductbycate);

// *********************store front**************
router.route("/getslider").get(Product.getslider);
router.route("/getproductbycate/:product").get(Product.getproductbycategory);
router.route("/getproductdetails/:id").get(Product.productdetails);

// router.route("/create-order").post(Product.payment)

module.exports = router;
