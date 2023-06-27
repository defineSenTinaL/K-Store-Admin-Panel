import axios from "axios";

// Category
export const getCategories = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/category`);
    //console.log(res); // The response data from the backend
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (slug) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const removeCategories = async (slug) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const updateCategory = async (slug, category) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API}/category/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const createCategory = async (category) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/category`, category);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

// Sub Category

export const getSubCategories = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/subcategory`);
    //console.log(res); // The response data from the backend
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubCategory = async (slug) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const removeSubCategories = async (slug) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const updateSubCategory = async (slug, SubCategory) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API}/subcategory/${slug}`);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const createSubCategory = async (SubCategory) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/subcategory`, SubCategory);
      console.log(response.data); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Sub Sub Category

  export const getSubSubCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/subsubcategory`);
      //console.log(res); // The response data from the backend
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getSubSubCategory = async (slug) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/subsubcategory/${slug}`);
        console.log(response.data); // The response data from the backend
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    export const removeSubSubCategories = async (slug) => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/subsubcategory/${slug}`);
        console.log(response.data); // The response data from the backend
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    export const updateSubSubCategory = async (slug, SubSubCategory) => {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_API}/subsubcategory/${slug}`);
        console.log(response.data); // The response data from the backend
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    export const createSubSubCategory = async (subSubCategory) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/subsubcategory`,
          subSubCategory
        );
        console.log(response.data); // The response data from the backend
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    