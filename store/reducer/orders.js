import { ADD_ORDERS } from "../action/orders";
import Order from "../../models/Order";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      const order = new Order(
        new Date().toString(),
        action.orders.item,
        action.orders.totalAmount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(order) };
  }
  return state;
};

export default orderReducer;
