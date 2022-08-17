import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, toggleAmount } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, amount, price }) => {
  const dispatch = useDispatch();
  //   console.log(img);
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div className="">
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleAmount({ id, type: "inc" }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleAmount({ id, type: "dec" }))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
