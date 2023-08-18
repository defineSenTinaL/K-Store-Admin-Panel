import axios from "axios";


export const getPendingOrder = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/pending`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getOrderById = async (_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/${_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getReturnOrder = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/order/return`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const returnAccepted = async (_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/order/accept-return/${_id}`
      );
      //console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const returnRejected = async (_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/order/reject-return/${_id}`
      );
      //console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }