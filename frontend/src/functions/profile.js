import axios from "axios";


export const updateInvoiceAddress = async (_id, newAddress) => {
    console.log(newAddress);
    console.log(_id);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API}/seller/${_id}/update-invoice-address`,
        { price: newAddress }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const updatePickupAddress = async (_id, newAddress) => {
    console.log(newAddress);
    console.log(_id);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API}/seller/${_id}/update-pickup-address`,
        { price: newAddress }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };