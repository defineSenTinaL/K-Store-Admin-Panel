import axios from "axios";

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/product`,
      productData
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