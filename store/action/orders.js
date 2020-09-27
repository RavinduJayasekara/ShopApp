export const ADD_ORDERS = "ADD_ORDERS";

export const addOrders = (item, totalAmount) => {
  return { type: ADD_ORDERS, orders: { item: item, totalAmount: totalAmount } };
};
