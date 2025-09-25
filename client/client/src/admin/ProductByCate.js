import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Conform from "./Conform";
import "../assets/css/ProductByCate.css";

const ProductByCate = () => {
  const [productbycate, setProductbycate] = useState([]);
  const [categories, setCategories] = useState([]);
  const [updateProductPopup, setUpdateProductPopup] = useState(false);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [productId, setProductId] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category_id, setCategory_id] = useState("");

  const [updateForm, setUpdateForm] = useState({
    id: "",
    category_id: "",
    title: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "title") {
      setProductTitle(value);
    } else if (name === "file" && files) {
      setProductImage(files[0]); // Get the selected file
    
    } else if (name === "image") {
      setProductImage(value);
    } else if (name === "price") {
      setProductPrice(value);
    }
  };

  const handleCancel = () => {
    setIsModelOpen(false);
  };

  const getdata = () => {
    axios
      .get("http://localhost:3000/getdata")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  const getproductbycate = () => {
    axios
      .get("http://localhost:3000/getproductbycate")
      .then((res) => {
        setProductbycate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproductbycate();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteproductbycate/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getproductbycate();
        } else {
          console.log("data is not delete");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("title", productTitle);
  //   data.append("image", productImage);
  //   data.append("price", productPrice);

    
 
  //   axios
  //     .put(
  //       `http://localhost:3000/updateproductbycate/${productId}`,
  //       data,
  //       {
  //         headers: {
  //           "Content-type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setUpdateForm({ title: "", image: "", price: "", id: "" });
  //       setUpdateProductPopup(false);
  //       getproductbycate();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
 
 
  const handleUpdate = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("title", productTitle);
    data.append("price", productPrice);
  
    // Only append the image if a new image is selected
    if (productImage instanceof File) {
      data.append("image", productImage);
    }
  
    axios
      .put(`http://localhost:3000/updateproductbycate/${productId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUpdateForm({ title: "", image: "", price: "", id: "" });
        setUpdateProductPopup(false);
        getproductbycate();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category_id", category_id);
    data.append("title", productTitle);
    data.append("image", productImage); // File object from the state
    data.append("price", productPrice);

    axios
      .post("http://localhost:3000/addproductbycate", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getproductbycate(); // Refresh product list
        setAddProductPopup(false); // Close the popup
        // Reset form fields
        // setCategory_id("");
        setProductTitle("");
        setProductImage(null);
        setProductPrice("");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <>
      <Header />

      <div className="dashboard-product-main">
        <Sidebar />
        <div className="dashboard-product-table">
          <div className="dashboard-content">
            <button
              className="add-new-product-btn"
              onClick={() => {
                setAddProductPopup(true);
              }}
            >
              add new product
            </button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>PRODUCT-IMAGE</th>
                  <th>PRICE</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {productbycate.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      <img src={`/uploads/${item.image}`} alt="" />
                    </td>
                    <td>{item.price}</td>

                    <td
                      onClick={() => {
                        setUpdateProductPopup(true);
                        setProductId(item.id);
                        setProductTitle(item.title);
                        setProductImage(null);
                        setProductPrice(item.price);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </td>

                    <td
                      onClick={() => {
                        setProductId(item.id);
                        setIsModelOpen(true);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </td>
                    <Conform
                      isOpen={isModelOpen}
                      onClose={handleCancel}
                      onConfirm={() =>
                        handleDelete(productId, setIsModelOpen(false))
                      }
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {updateProductPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button
              className="close-btn"
              onClick={() => setUpdateProductPopup(false)}
            >
              ×
            </button>
            <h2>Update Product Data</h2>

            <form onSubmit={handleUpdate}>
              <label>TITLE</label>
              <p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Enter title"
                  value={productTitle}
                />
              </p>
              <label>IMAGE</label>
              <p>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  placeholder="Enter image URL"
                />
              </p>
              <label>PRICE</label>
              <p>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  placeholder="Enter price"
                  value={productPrice}
                />
              </p>
              <button type="submit" className="update-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {addProductPopup && (
        <div className="add-newproduct-overlay">
          <div className="add-product-container">
            <button
              className="close-btn"
              onClick={() => setAddProductPopup(false)} // Close the popup
            >
              ×
            </button>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  // id="title"
                  name="title"
                  // value={productTitle}
                  onChange={handleChange}
                  // required
                />
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  // id="price"
                  name="price"
                  // value={productPrice}
                  onChange={handleChange}
                  // required
                />
              </div>

              <div>
                <label htmlFor="category_id">Category:</label>
                <select
                  // id="category_id"
                  name="category_id"
                  // value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                  // required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  // id="image"
                  name="file"
                  // accept="image/*"
                  onChange={handleChange}
                  // required
                />
              </div>

              <button type="submit" className="addproduct-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductByCate;
