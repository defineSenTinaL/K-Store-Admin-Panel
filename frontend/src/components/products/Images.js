import { Upload } from "antd";
import React, { useState } from "react";

const Images = ({ onSubmit }) => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onSubmit(newFileList); // Invoke the onSubmit callback with the updated fileList
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        multiple // Enable multiple file upload
      >
        {fileList.length < 6 && "+ Upload"}
      </Upload>
    </>
  );
};

export default Images;
