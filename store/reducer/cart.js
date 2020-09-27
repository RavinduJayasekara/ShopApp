import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/cart";
import Item from "../../models/Item";
import { ADD_ORDERS } from "../action/orders";
import { DELETE_PRODUCT } from "../action/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.productItem;
      console.log(state.items);
      const prodTitle = product.title;
      const prodPrice = product.price;
      if (state.items[product.id]) {
        const updatedProduct = new Item(
          state.items[product.id].quantity + 1,
          prodTitle,
          prodPrice,
          state.items[product.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [product.id]: updatedProduct },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const itemProduct = new Item(1, prodTitle, prodPrice, prodPrice);
        return {
          ...state,
          items: { ...state.items, [product.id]: itemProduct },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    case REMOVE_FROM_CART:
      const productId = action.pid;
      const itemId = state.items[productId];
      const itemQty = state.items[productId].quantity;

      if (itemQty > 1) {
        const updatedItem = new Item(
          itemId.quantity - 1,
          itemId.prodTitle,
          itemId.prodPrice,
          itemId.sum - itemId.prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [productId]: updatedItem },
          totalAmount: state.totalAmount - itemId.prodPrice,
        };
      } else {
        const allItems = { ...state.items };
        delete allItems[productId];
        return {
          ...state,
          items: allItems,
          totalAmount: state.totalAmount - itemId.prodPrice,
        };
      }
    case ADD_ORDERS:
      return initialState;
    case DELETE_PRODUCT:
      const prodId = action.pid;
      if (!state.items[prodId]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const totalSum = updatedItems[prodId].sum;
      delete updatedItems[prodId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - totalSum,
      };
  }
  return state;
};

export default cartReducer;
