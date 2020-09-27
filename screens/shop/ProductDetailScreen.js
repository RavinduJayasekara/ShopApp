import React from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/action/cart";

const ProductDetails = (props) => {
  const prodId = props.route.params.productId;

  const products = useSelector((state) => state.product.availableProducts);

  const selectedProduct = products.find((prod) => prod.id === prodId);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={{ uri: selectedProduct.imageUrl }}
          style={styles.image}
        />
        <Button
          title="Add Cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
          color = 'blue'
        />
        <Text style={styles.title}>{selectedProduct.title}</Text>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { height: 300, width: "100%" },
  title: { textAlign: "center", fontSize: 23, margin: 10 },
  price: { textAlign: "center", fontSize: 18, margin: 5 },
  description: { textAlign: "center", fontSize: 15, marginHorizontal: 15 },
});

export default ProductDetails;
