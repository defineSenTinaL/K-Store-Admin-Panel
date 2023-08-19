import axios from "axios";

export const getRecentOrders = async (page, limit) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/order`, {
      params: {
        page, // Pass the page parameter
        limit, // Pass the limit parameter
      },
    });
    return response.data; // Return the response data from the backend
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export const getTodaySales = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/today-sales`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getPendingOrderCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/pending-orders-count`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getReturnOrderCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/return-count`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
