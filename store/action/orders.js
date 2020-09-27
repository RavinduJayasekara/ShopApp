export const ADD_ORDERS = "ADD_ORDERS";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shopappreactnative-52255.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);

      dispatch({ type: SET_ORDERS });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrders = (item, totalAmount) => {
  return async (dispatch) => {
    try {
      const date = new Date();
      const response = await fetch(
        "https://shopappreactnative-52255.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: { "Content-Type": "application.json" },
          body: JSON.stringify({
            item,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_ORDERS,
        orders: {
          id: resData.name,
          item: item,
          totalAmount: totalAmount,
          date: date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
