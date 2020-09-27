import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://shopappreactnative-52255.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const setProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shopappreactnative-52255.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const resData = await response.json();

      // console.log(resData);

      const productArray = [];
      for (const key in resData) {
        productArray.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: productArray,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    //you can write any async code in here
    // dispatch function will run only after the async code is executed

    const response = await fetch(
      "https://shopappreactnative-52255.firebaseio.com/products.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://shopappreactnative-52255.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            imageUrl,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { title, imageUrl, description },
      });
    } catch (error) {
      throw error;
    }
  };
};
