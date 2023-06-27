import React from 'react'

const Keyword = () => {
  return (
    <div>Keyword</div>
  )
}

export default Keyword;


// import { Upload } from "antd";
// import React, { useState } from "react";

// import Resizer from "react-image-file-resizer";

// const Images = () => {
//   const [fileList, setFileList] = useState([]);
//   const onChange = ({ fileList: newFileList }) => {
//     const files = newFileList;
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         Resizer.imageFileResizer(
//           files[i],
//           720,
//           720,
//           "JPEG",
//           100,
//           0,
//           (uri) => {
//             console.log(uri);
//           }, 'base64');
//       }
//     }
//     setFileList(newFileList);
//   };
//   return (
//     <>
//       <Upload
//         //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         multiple={true}
//         //onPreview={onPreview}
//       >
//         {fileList.length < 6 && "+ Upload"}
//       </Upload>
//     </>
//   );
// };
// export default Images;
