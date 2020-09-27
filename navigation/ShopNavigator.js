import React from "react";
import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import HeaderButton from "../components/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";

const ProductStack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="ProductOverviewScreen"
        component={ProductOverviewScreen}
        options={(props) => ({
          headerTitle: "Products",
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName="ios-cart"
                  onPress={() => props.navigation.navigate("CartScreen")}
                />
              </HeaderButtons>
            );
          },
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => props.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <ProductStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={(props) => ({
          headerTitle: props.route.params.title,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName="ios-cart"
                  onPress={() => props.navigation.navigate("CartScreen")}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <ProductStack.Screen name="CartScreen" component={CartScreen} />
    </ProductStack.Navigator>
  );
};

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={(props) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => props.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </OrderStack.Navigator>
  );
};

const AdminStack = createStackNavigator();

const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="UserProductScreen"
        component={UserProductScreen}
        options={(props) => ({
          headerTitle: "Your Products",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => props.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  iconName="ios-create"
                  onPress={() =>
                    props.navigation.navigate("EditProductScreen", { pid: "" })
                  }
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <AdminStack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={(props) => ({
          headerTitle: props.route.params.pid
            ? "Edit Product"
            : "Add a Product",
        })}
      />
    </AdminStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Product"
          component={ProductStackNavigator}
          options={{
            drawerIcon: () => {
              return <Ionicons name="ios-cart" size={23} color="#ccc" />;
            },
          }}
        />
        <Drawer.Screen
          name="Order"
          component={OrderStackNavigator}
          options={{
            drawerIcon: () => {
              return <Ionicons name="ios-list" size={23} color="#ccc" />;
            },
          }}
        />
        <Drawer.Screen
          name="User Products"
          component={AdminStackNavigator}
          options={{
            drawerIcon: () => {
              return <Ionicons name="ios-create" size={23} color="#ccc" />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
