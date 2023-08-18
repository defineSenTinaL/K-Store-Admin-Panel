import React, { useState, useEffect } from "react";
import ImageKit from "imagekit-javascript";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button, message, Input } from "antd";
import axios from "axios";
import slugify from "slugify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ data, onSubmit }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [folderName, setFolderName] = useState(""); // State to store the user-provided folder name

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const generateSEOFriendlyName = (originalName, index) => {
    const indexToLetters = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth" /* Add more as needed */,
    ];

    // Convert folderName to a slug
    const slugifiedFolderName = slugify(folderName, { lower: true });

    const seoFriendlyIndex = indexToLetters[index] || (index + 1).toString();

    // Combine slugified folder name, index, and original name
    return `${slugifiedFolderName}-${seoFriendlyIndex}-${originalName}`;
  };

  const onUploadSuccess = (result) => {
    const seoFriendlyName = generateSEOFriendlyName(
      result.name,
      fileList.length
    );
    console.log(result);
    setFileList((prevFileList) => [
      ...prevFileList,
      {
        uid: `-${Date.now()}`, // Generate a unique uid for each uploaded file
        name: seoFriendlyName,
        status: "done",
        url: result.url,
        fileId: result.fileId,
      },
    ]);
  };

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
        folder: folderName,
      });

      onUploadSuccess(result);
      onSuccess({ fileId: result.fileId, url: result.url });
    } catch (error) {
      console.error("Image upload failed:", error);
      onError();
    }
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    console.log(data);
    if (data && Array.isArray(data.image)) {
      // Check if data is defined and data.image is an array
      const fileListData = data.image.map((image) => ({
        uid: image.fileId,
        name: image.name,
        status: "done",
        url: image.url,
        fileId: image.fileId,
      }));
      setFileList(fileListData);
    }
  }, [data]);

  const handleProcessing = () => {
    const imageDetails = fileList.map((file) => ({
      url: file.url,
      fileId: file.fileId,
    }));

    onSubmit(imageDetails);
  };

  const handleRemove = async (file) => {
    console.log(file);
    try {
      const deleteEndpoint = `http://localhost:5000/images/${file.fileId}`;

      const response = await axios.delete(deleteEndpoint);

      if (response.status === 200) {
        setFileList((prevFileList) =>
          prevFileList.filter((item) => item.uid !== file.uid)
        );
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Button onClick={handleProcessing}>Process Images</Button>

      <br />
      <br />
      <br />
      <Input
        placeholder="Product Folder Name"
        value={folderName}
        onChange={handleFolderNameChange}
      />
    </>
  );
};

export default ImageUpload;

