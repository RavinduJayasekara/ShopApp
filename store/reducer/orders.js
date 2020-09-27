import { ADD_ORDERS, SET_ORDERS } from "../action/orders";
import Order from "../../models/Order";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      const order = new Order(
        action.orders.id,
        action.orders.item,
        action.orders.totalAmount,
        action.orders.date
      );
      return { ...state, orders: state.orders.concat(order) };

    case SET_ORDERS:
      return { orders: action.orders };
  }
  return state;
};

export default orderReducer;
