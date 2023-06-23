import axios from "axios";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/category`);
    //console.log(res); // The response data from the backend
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (slug) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
    } catch (error) {
      console.error(error);
    }
  };

  export const removeCategories = async (slug) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
    } catch (error) {
      console.error(error);
    }
  };

  export const updateCategory = async (slug, category) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
    } catch (error) {
      console.error(error);
    }
  };

  export const createCategory = async (category) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/category`, category);
      console.log(response.data); // The response data from the backend
    } catch (error) {
      console.error(error);
    }
  };