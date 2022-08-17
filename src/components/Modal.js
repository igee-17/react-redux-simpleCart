import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/cart/modal/modalSlice";
const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            type="button"
            onClick={() => {
              dispatch(closeModal());
              dispatch(clearCart());
            }}
          >
            confirm
          </button>
          <button
            className="btn clear-btn"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
