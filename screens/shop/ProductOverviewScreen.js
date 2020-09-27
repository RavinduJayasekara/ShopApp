import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductTile from "../../components/ProductTile";
import { addToCart } from "../../store/action/cart";
import * as productActions from "../../store/action/product";

const ProductOverview = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prouducts = useSelector((state) => state.product.availableProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log("Ravindu");
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.setProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const focusSub = props.navigation.addListener("focus", loadProducts);

    // below code has to be a function
    // in this case it is a clean up function

    return () => {
      focusSub.remove();
    };
  }, [loadProducts]);

  const onDetailHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      title: title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error has occured!</Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  if (!isLoading && prouducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products. Add some</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={prouducts}
      renderItem={(itemData) => {
        return (
          <ProductTile
            imageUrl={itemData.item.imageUrl}
            prodTitle={itemData.item.title}
            prodPrice={itemData.item.price}
            onSelect={() =>
              onDetailHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              title="View Details"
              onPress={() =>
                onDetailHandler(itemData.item.id, itemData.item.title)
              }
              color={Platform.OS === "android" ? "white" : "#7B38DA"}
            />
            <Button
              title="Add Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
              color={Platform.OS === "android" ? "white" : "#7B38DA"}
            />
          </ProductTile>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverview;
