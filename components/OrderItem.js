import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import CartItem from "./CartItem";
import { removeFromCart } from "../store/action/cart";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderContainer}>
      <View style={styles.titleContainer}>
        <Text>{props.total}</Text>
        <Text>{props.date}</Text>
      </View>
      <View style={styles.action}>
        <Button
          title={showDetails ? "hide details" : "show details"}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
        {showDetails && (
          <View>
            {props.item.map((itemData) => (
              <CartItem
                key={itemData.productId}
                prodQty={itemData.productQty}
                prodSum={itemData.productSum}
                prodTitle={itemData.productTitle}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    alignItems: "center",
  },
});

export default OrderItem;
