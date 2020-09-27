import React from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

const ProudctTile = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onSelect} style={styles.touchable}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: props.imageUrl }} style={styles.image} />
          <View style={{ height: "15%" }}>
            <Text style={styles.title}>{props.prodTitle}</Text>
            <Text style={styles.price}>${props.prodPrice}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
    height: 300,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  image: { width: "100%", height: "60%" },
  title: { textAlign: "center", fontSize: 23 },
  price: { textAlign: "center", fontSize: 18 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "25%",
  },
  touchable: {
    flex: 1,
  },
});

export default ProudctTile;
