import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Conform from "./Conform";
import("../assets/css/Product.css");

const Product = () => {
  const [getProductData, setGetProductData] = useState([]);
  const [addDataPopup, setAddDataPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [ismodalopen, setIsModalOpen] = useState(false);

  const [proId, setProId] = useState("");
  const [proTitle, setProTitle] = useState("");
  const [proImage, setProImage] = useState("");
  const [proPrice, setProPrice] = useState("");

  const [updateForm, setUpdateForm] = useState({
    id: "",
    title: "",
    image: "",
    price: "",
  });

  const getdata = () => {
    axios
      .get("http://localhost:3000/getdata")
      .then((res) => {
        setGetProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(() => {
    getdata();
  }, []);

  const handledelete = (id) => {
    axios
      .delete(`http://localhost:3000/deletedata/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getdata();
        } else {
          console.log("data is not delete");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "title") {
      setProTitle(value);
    } else if (name === "file") {
      setProImage(files[0]);
    } else if (name === "image") {
      setProImage(value);
    } else if (name === "price") {
      setProPrice(value);
    }
  };

  const handleClose = () => {
    setAddDataPopup(false);
    setUpdatePopup(false);
  };

 
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", proTitle);
    formData.append("image", proImage);
    formData.append("price", proPrice);
    axios
      .post("http://localhost:3000/adddata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getdata();
        setAddDataPopup(false);
      })
      .catch((err) => {
        console.log(err );
      });
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  // const  updateData={
  //     id: proId,
  //     title: proTitle,
  //     image: proImage,
  //     price: proPrice,
  //   };
  //   axios
  //     .put(`http://localhost:3000/updatedata/${updateData.id}`, updateData)
  //     .then((res) => {
  //       setUpdateForm({ title: "", image: "", price: "", id: "" });
  //       setUpdatePopup(false);
  //       getdata();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

const handleUpdate=(e)=>{
  e.preventDefault();
  const data=new FormData();
  data.append("title",proTitle);
  data.append("price",proPrice);
  
  if(proImage instanceof File){
data.append("image",proImage)
  }
  axios.put(`http://localhost:3000/updatedata/${proId}`,data,{
    headers:{
      "Content-Type":"multipart/form-data",
    },
  }).then((res)=>{
    setUpdateForm({title:"",image:"",price:"",id:""})
    setUpdatePopup(false);
    getdata()
  }).catch((err)=>{
    console.log(err)
  })
}
 

  return (
    <>
      {/* *************product table*************** */}
        <Header />
       <div className="dashboard-category-main">
       <Sidebar />
        <div className="dashboard-category-table">
        <div className="main-content">
            <button
              className="add-btn"
              onClick={() => {
                setAddDataPopup(true);
              }}
            >
              Add new data
            </button>

            <div className="product-table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {getProductData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <img src={`/uploads/${item.image}`} alt="" />
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => {
                            setUpdatePopup(true);
                            setProId(item.id);
                            setProTitle(item.title);
                            setProImage(item.image);
                            setProPrice(item.price);
                          }}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => {
                            setIsModalOpen(true);
                            // handledelete(item.id)
                            setProId(item.id)
                          }}
                        ></i>
                      </td>
                      <Conform
                    isOpen={ismodalopen}
                    onClose={handleCancel}
                    onConfirm={() =>
                      handledelete(proId, setIsModalOpen(false))
                    }
                    message="Are you sure you want to delete this record?"
                  />
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>

      {/* ************add data form ****************/}
      {addDataPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <label>TITLE</label>
              <p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Enter title"
                />
              </p>
              <label>IMAGE</label>
              <p>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
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
                />
              </p>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
      {/* ***************update data popup*********** */}
      {updatePopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>
            <h2>Update Category Data</h2>

            <form onSubmit={handleUpdate}>
              <label>TITLE</label>
              <p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}           
                  placeholder="Enter title"
                  value={proTitle}
                />
              </p>
              <label>IMAGE</label>
              <p>
                <input
                  type="file"
                  name="image"
                  onChange={(e)=>setProImage(e.target.files[0])}
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
                  value={proPrice}
                />
              </p>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
