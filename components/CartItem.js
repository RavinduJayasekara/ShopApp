import React, { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 8,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Text>{props.prodTitle}</Text>
      <Text>{props.prodQty}</Text>
      <Text>{props.prodSum}</Text>
      {props.deletable && (
        <Ionicons
          name="md-trash"
          color="red"
          onPress={props.onDeletable}
          size={23}
        />
      )}
    </View>
  );
};

export default CartItem;
