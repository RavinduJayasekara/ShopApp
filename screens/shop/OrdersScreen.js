import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../../components/OrderItem";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

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
