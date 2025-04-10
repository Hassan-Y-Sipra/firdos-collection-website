const db = require("../../config/Dbconnection");


const admin = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username=? and password=?";
  db.query(sql, [username, password], (err, result) => {
    if (result.length > 0) {
      res.status(200).send({ message: "succsessful" });
    } else {
      res.status(401).send({ message: "Invailid username or password" });
    }
  });
};
// **************** category data on dashboard********************
const getProductData = (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err + "error in getting data njj");
    }
    res.send(result);
  });
};

const deleteData = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

const addnewdata = (req, res) => {
  const file = req.file.filename;
  const { title, price } = req.body;
  const sql = "INSERT INTO product(title,image,price)VALUES(?,?,?)";
  db.query(sql, [title, file, price], (err, result) => {
    if (err) {
      res.status(500);
      console.log(err + "error in add new product");
    }
    res.send(result);
  });
};

const updateData = (req, res) => {
  const id = req.params.id;
  const file = req.file ? req.file.filename : null;
  const { title, price } = req.body;
  let sql;
  let params;
  if (file) {
    sql = "UPDATE product SET title=?,image=?,price=? WHERE ID =?";
    params = [title, file, price, id];
  } else {
    sql = "UPDATE product SET title=?,price=? WHERE ID =?";
    params = [title, price, id];
  }
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

// *********************product by category  for dashboard**********************************

const getProductbycate = (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err + "error in getting data");
    }
    res.send(result);
  });
};

const deleteProductbycate = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

const updateProductbycate = (req, res) => {
  const id = req.params.id;
  const file = req.file ? req.file.filename : null;
  const { title, price } = req.body;
  let sql;
  let params;
  if (file) {
    sql = "UPDATE category SET title=?,image=?,price=? WHERE ID =?";
    params = [title, file, price, id];
  } else {
    sql = "UPDATE category SET title=?,price=? WHERE ID=?";
    params = [title, price, id];
  }
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

const addnewProductbycate = (req, res) => {
  const file = req.file ? req.file.filename : null;
  const { category_id, title, price } = req.body;
  const sql =
    "INSERT INTO category( category_id, title, image, price) VALUES (?, ?, ?, ?)";
  db.query(sql, [category_id, title, file, price], (err, result) => {
    if (err) {
      res.status(500);
      console.log("aaaa");
    }
    res.send(result);
  });
};

// ******************store  front ************************
const getslider = (req, res) => {
  const sql = "SELECT * FROM slider";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    res.send(result);
  });
};

// ************get-product by category  for client site*****

const getproductbycategory = (req, res) => {
  const { product } = req.params;
  const sql = "SELECT * FROM category WHERE category_id=?";
  db.query(sql, [product], (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

// ************productdetails *****************

const productdetails = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM category WHERE id=?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500);
    }
    res.send(result);
  });
};

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const payment = async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     const options = {
//       amount: amount,
//       currency: currency || "INR",
//     };
//     const order = await razorpay.orders.create(options);
//     console.log(order);
//     if (!order) {
//       res.status(500).json({ message: "Internel server error on payment" });
//     }
//     res.json(order);
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  admin,
  getProductData,
  deleteData,
  addnewdata,
  updateData,

  getProductbycate,
  deleteProductbycate,
  updateProductbycate,
  addnewProductbycate,

  getslider,
  getproductbycategory,
  productdetails,

  // payment,
};
