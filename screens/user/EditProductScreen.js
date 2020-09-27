import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/action/product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { Alert } from "react-native";

const EditProductScreen = (props) => {
  const productId = props.route.params.pid;

  const userProducts = useSelector((state) => state.product.userProducts);

  const userProduct = userProducts.find((prod) => prod.id === productId);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [title, setTitle] = useState(userProduct ? userProduct.title : "");
  const [image, setImage] = useState(userProduct ? userProduct.imageUrl : "");
  const [desc, setDesc] = useState(userProduct ? userProduct.description : "");
  const [price, setPrice] = useState(userProduct ? userProduct.price : "");

  const submit = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (userProduct) {
        await dispatch(
          productActions.updateProduct(productId, title, image, desc)
        );
      } else {
        await dispatch(
          productActions.createProduct(title, image, desc, +price)
        );
      }
      props.navigation.navigate("UserProductScreen");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, title, image, desc, price, productId]);

  useLayoutEffect(() => {
    if (error) {
      Alert.alert("An Error Ocured", error, [{ text: "Okay" }]);
    }
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName="ios-checkmark" onPress={submit} />
        </HeaderButtons>
      ),
    });
  }, [submit, error]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Title </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>ImageUrl</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={(text) => setImage(text)}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.input}
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />
      </View>
      {userProduct ? null : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    margin: 15,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
