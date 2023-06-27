import axios from "axios";

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/product`,
      productData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response.data); // The response data from the backend
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
