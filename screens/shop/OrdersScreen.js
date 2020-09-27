import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import OrderItem from "../../components/OrderItem";
import * as orderActions from "../../store/action/orders";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderActions.fetchOrders());
  });

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          total={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          item={itemData.item.item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default OrderScreen;
