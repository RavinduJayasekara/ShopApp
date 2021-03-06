import React, { useState } from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/action/cart";
import { addOrders } from "../../store/action/orders";
import CartItem from "../../components/CartItem";

const Cart = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const productContents = useSelector((state) => {
    const itemArray = [];
    for (const key in state.cart.items) {
      itemArray.push({
        productId: key,
        productPrice: state.cart.items[key].prodPrice,
        productTitle: state.cart.items[key].prodTitle,
        productQty: state.cart.items[key].quantity,
        productSum: state.cart.items[key].sum,
      });
    }
    return itemArray;
  });

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const orderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrders(productContents, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          justifyContent: "space-evenly",
        }}
      >
        <Text>total amount {totalAmount.toFixed(2)}</Text>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="small" color="purple" />
          </View>
        ) : (
          <Button
            title="order now"
            onPress={orderHandler}
            color={"#ccc"}
            disabled={productContents.length === 0 ? true : false}
          />
        )}
      </View>
      <FlatList
        data={productContents}
        renderItem={(itemData) => {
          return (
            <CartItem
              prodTitle={itemData.item.productTitle}
              prodQty={itemData.item.productQty}
              prodSum={itemData.item.productSum}
              prodId={itemData.item.productId}
              deletable
              onDeletable={() => {
                dispatch(removeFromCart(itemData.item.productId));
              }}
            />
          );
        }}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
};

export default Cart;
