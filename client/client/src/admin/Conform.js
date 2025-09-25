import React from "react";
import("../assets/css/Conform.css");

const Conform = ({
  isOpen,
  onClose,
  onConfirm,
  message = "are you shure",
}) => {
  if(!isOpen)return null;
  return (
    <>
      <div className="confirm-page-main">
        <div className="confirm-box">
        <button className="confirm-close-btn" onClick={onClose}>
                <i class="fa-solid fa-x"></i>
              </button>


          <p>{message}</p>
          <div className="confirm-2btn">
            <button className="btn-delete" onClick={onConfirm}>
              DELETE
            </button>
            <button className="btn-close" onClick={onClose}>
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conform;
