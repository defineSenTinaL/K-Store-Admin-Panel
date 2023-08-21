import axios from "axios";


export const getBrand = async (page, limit) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/product/brand`, {
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