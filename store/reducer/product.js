import PRODUCTS from "../../data/data-dummy";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from "../action/product";
import Product from "../../models/Product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts: action.products,
        userProducts: action.products,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const userIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      // console.log(state.userProducts[userIndex]);
      // console.log(action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[userIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userIndex] = updatedProduct;

      const updatedAvailableProducts = [...state.availableProducts];
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
  }
  return state;
};

export default productReducer;
