import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductTile from "../../components/ProductTile";
import { deleteProduct } from "../../store/action/product";

const UserProductScreen = (props) => {
  const userProdct = useSelector((state) => state.product.userProducts);

  const dispatch = useDispatch();

  const onEditableHandler = (id) => {
    props.navigation.navigate("EditProductScreen", {
      pid: id,
    });
  };

  const onDeleteHandler = (id) => {
    Alert.alert("Delete", "Do you want to delete this shit?", [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
      { text: "No", style: "default" },
    ]);
  };

  return (
    <FlatList
      data={userProdct}
      renderItem={(itemData) => (
        <ProductTile
          onTouch={() => {
            props.navigation.navigate("ProductDetailScreen", {
              productId: itemData.item.id,
              title: itemData.item.title,
            });
          }}
          imageUrl={itemData.item.imageUrl}
          prodTitle={itemData.item.title}
          prodPrice={itemData.item.price}
          onSelect={() => onEditableHandler(itemData.item.id)}
        >
          <Button
            title="Edit"
            onPress={() => onEditableHandler(itemData.item.id)}
            color={"#7B38DA"}
          />
          <Button
            title="Delete"
            onPress={() => onDeleteHandler(itemData.item.id)}
            color={"#7B38DA"}
          />
        </ProductTile>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default UserProductScreen;
