import axios from "axios";

export const createProduct = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/product`,
      data
    );
    console.log(response.data); // The response data from the backend
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async (page, limit) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product`, {
      params: {
        page, // Pass the page parameter
        limit, // Pass the limit parameter
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductPrice = async (_id, newPrice) => {
  console.log(newPrice);
  console.log(_id);
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/product/${_id}/update-price`,
      { price: newPrice }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductQuantity = async (_id, newQuantity) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/product/${_id}/update-quantity`,
      { quantity: newQuantity }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};