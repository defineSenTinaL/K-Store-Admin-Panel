import React, { useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, Button, message } from "antd";
import ImageKit from "imagekit-javascript";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState("");

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const imageKit = new ImageKit({
        publicKey: "public_xL5mD9kBclemQcQwc/RQV5R04qY=",
        urlEndpoint: "https://ik.imagekit.io/dintly",
        authenticationEndpoint: "http://localhost:5000/images/auth",
      });

      const result = await imageKit.upload({
        file: file,
        fileName: file.name,
      });

      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: result.url,
          fileId: result.fileId,
        },
      ]);
      onUpload(result.url);
      setFileId(result.fileId);
      onSuccess();
    } catch (error) {
      console.error("Image upload failed:", error);
      onError();
    }
  };

  const handleRemove = async () => {
    try {
      const deleteEndpoint = `http://localhost:5000/images/${fileId}`;

      const response = await axios.delete(deleteEndpoint);

      if (response.status === 200) {
        message.success("Image deleted successfully.");
      } else {
        console.error("Image deletion failed:", response.statusText);
        message.error("Image deletion failed.");
      }
    } catch (error) {
      console.error("Image deletion failed:", error);
      message.error("Image deletion failed.");
    }
  };

  const props = {
    name: "file",
    customRequest: customRequest,
    fileList: fileList,
    onRemove: handleRemove, // Add this line to handle image removal
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default ImageUpload;
