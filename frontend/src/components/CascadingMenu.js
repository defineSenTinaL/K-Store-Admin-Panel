// import React, { useState, useEffect } from 'react';
// import { Select, Space } from 'antd';
// import { getCategories, getSubCategories, getSubSubCategories } from '../functions/category';

// const { Option } = Select;

// const CascadingMenu = ({ onChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subSubCategories, setSubSubCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     getCategories().then((res) => {
//       setCategories(res);
//     });
//   };

//   const fetchSubCategories = () => {
//     getSubCategories().then((res) => {
//       setSubCategories(res);
//     });
//   };


//   const fetchSubSubCategories = () => {
//     getSubSubCategories().then((res) => {
//       setSubCategories(res);
//     });
//   };

//   const filterSubCategories = (categoryId) => {
//     if (!categoryId) {
//       setSubCategories([]);
//       return;
//     }

//     const filteredSubCategories = subCategories.filter((subCategory) => subCategory.categoryId === categoryId);
//     setSubCategories(filteredSubCategories);
//     setSelectedSubCategory(null);
//   };

//   const filterSubSubCategories = (subCategoryId) => {
//     if (!subCategoryId) {
//       setSubSubCategories([]);
//       return;
//     }

//     const filteredSubSubCategories = subSubCategories.filter(
//       (subSubCategory) => subSubCategory.subCategoryId === subCategoryId
//     );
//     setSubSubCategories(filteredSubSubCategories);
//     setSelectedSubSubCategory(null);
//   };

//   const handleCategoryChange = (id) => {
//     setSelectedCategory(id);
//     setSelectedSubCategory(null);
//     setSelectedSubSubCategory(null);
//     filterSubCategories(id); // Update this line
//     onChange({ category: id, subCategory: null, subSubCategory: null });
//   };
  

//   const handleSubCategoryChange = (id) => {
//     setSelectedSubCategory(id);
//     setSelectedSubSubCategory(null);
//     filterSubSubCategories(id); // Update this line
//     onChange({ category: selectedCategory, subCategory: id, subSubCategory: null });
//   };

//   const handleSubSubCategoryChange = (id) => {
//     setSelectedSubSubCategory(id);
//     onChange({ category: selectedCategory, subCategory: selectedSubCategory, subSubCategory: id });
//   };

//   return (
//     <>
//       <Space direction='vertical' size='large' style={{ display: 'flex' }}>
//         <Select
//           placeholder="Select Category"
//           size='large'
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//         >
//           {categories.map((category) => (
//             <Option key={category.id} value={category.id}>
//               {category.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           placeholder="Select Subcategory"
//           size='large'
//           value={selectedSubCategory}
//           onChange={handleSubCategoryChange}
//           disabled={!selectedCategory}
//         >
//           {subCategories.map((subCategory) => (
//             <Option key={subCategory.id} value={subCategory.id}>
//               {subCategory.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           placeholder="Select Sub-Subcategory"
//           size='large'
//           value={selectedSubSubCategory}
//           onChange={handleSubSubCategoryChange}
//           disabled={!selectedSubCategory}
//         >
//           {subSubCategories.map((subSubCategory) => (
//             <Option key={subSubCategory.id} value={subSubCategory.id}>
//               {subSubCategory.name}
//             </Option>
//           ))}
//         </Select>
//       </Space>
//     </>
//   );
// };

// export default CascadingMenu;
