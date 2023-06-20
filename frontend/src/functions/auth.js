import axios from "axios";

export const createSeller = async (authToken, name) => {
  const data = {
    name,
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/seller/create-seller`,
      data,
      {
        headers: {
          authToken,
        },
      }
    );
    console.log(response.data); // The response data from the backend
  } catch (error) {
    console.error(error);
  }
};

export const currentSeller = async (authToken) => {
  try {
    const seller = await axios.get(
      `${process.env.REACT_APP_API}/seller/current-seller`,
      {
        headers: {
          authToken,
        },
      }
    );
    //console.log(seller.data);
    return seller.data;
  } catch (error) {
    //console.log(error);
    throw new Error("Error retrieving current seller");
  }
};
