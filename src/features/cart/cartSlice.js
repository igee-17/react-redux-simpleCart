import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  cartItems: [],
  total: 0,
  amount: 4,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleAmount: (state, action) => {
      const { id, type } = action.payload;
      // console.log(action);
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (type === "inc") {
        cartItem.amount = cartItem.amount + 1;
        return;
      } else if (type === "dec") {
        cartItem.amount = cartItem.amount - 1;
        if (cartItem.amount < 1) {
          cartItem.amount = 1;
        }
        return;
      }
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, actions) => {
      state.isLoading = false;
      // console.log(actions);
      state.cartItems = actions.payload;
    },
    [getCartItems.rejected]: (state, actions) => {
      state.isLoading = false;
      // console.log(actions.payload);
      // mess up url to get this error
    },
  },
});

// console.log(cartSlice.reducer());
export const { clearCart, removeItem, toggleAmount, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
