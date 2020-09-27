import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducer/product";
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducer/cart";
import orderReducer from "./store/reducer/orders";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
// import React from "react";
// import { Picker, View } from "react-native";

// const HomeScreen = (props) => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center" }}>
//       <Picker style = {{backgroundColor: 'blue'}} itemStyle={{ height: 60 }}>
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="Python" value="python" />
//       </Picker>
//     </View>
//   );
// };

// export default HomeScreen;
