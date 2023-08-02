import React, { useState } from "react";
import ImageKit from "imagekit-javascript";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button, message, Input } from "antd";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ onSubmit }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [folderName, setFolderName] = useState(""); // State to store the user-provided folder name

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const onUploadSuccess = (result) => {
    console.log(result);
    // const { url, fileId } = result;
    setFileList((prevFileList) => [
      ...prevFileList,
      {
        uid: `-${Date.now()}`, // Generate a unique uid for each uploaded file
        name: result.name,
        status: "done",
        url: result.url,
        fileId: result.fileId,
      },
    ]);
    //console.log("Image uploaded successfully: ", url, fileId);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    // Prepare and upload the file using ImageKit
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

  // Function to handle further processing, you can pass the imageUrls to another component here
  const handleProcessing = () => {
    const imageDetails = fileList.map((file) => {
      console.log(file);
      return {
        url: file.response.url,
        fileId: file.response.fileId,
      };
    });

    onSubmit(imageDetails);
  };

  const handleRemove = async (file) => {
    console.log(file);
    try {
      const deleteEndpoint = `http://localhost:5000/images/${file.response.fileId}`;
      //console.log(file.response.fileId);

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
      <Button onClick={handleProcessing}>Save URLs</Button>

      <br/>
      <br/>
      <br/>
      <Input
          placeholder="Product Folder Name"
          value={folderName}
          onChange={handleFolderNameChange}
        />
    </>
  );
};

export default ImageUpload;

// import React, { useState } from "react";
// import ImageKit from "imagekit-javascript";
// import { PlusOutlined } from "@ant-design/icons";
// import { Modal, Upload, Button, message, Popconfirm } from "antd";
// import axios from "axios";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const ImageUpload = ({ handleImageUrls }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [fileList, setFileList] = useState([]);

//   const onUploadSuccess = (result) => {
//     const { url, fileId } = result;
//     setFileList((prevFileList) => [
//       ...prevFileList,
//       {
//         uid: `-${Date.now()}`, // Generate a unique uid for each uploaded file
//         name: result.name,
//         status: "done",
//         url: url,
//         fileId: fileId,
//       },
//     ]);
//     console.log("Image uploaded successfully: ", url);
//   };

//   const customRequest = async ({ file, onSuccess, onError }) => {
//     // Prepare and upload the file using ImageKit
//     try {
//       const imageKit = new ImageKit({
//         publicKey: "public_xL5mD9kBclemQcQwc/RQV5R04qY=",
//         urlEndpoint: "https://ik.imagekit.io/dintly",
//         authenticationEndpoint: "http://localhost:5000/images/auth",
//       });

//       const result = await imageKit.upload({
//         file: file,
//         fileName: file.name,
//       });
//       //console.log(result);
//       onUploadSuccess(result);

//       handleRemove(result);
//       // Include the response with the uploaded image's URL in the custom upload request
//       onSuccess({
//         url: result.url,
//       });
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       onError();
//     }
//   };

//   const handleCancel = () => setPreviewOpen(false);
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(
//       file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     );
//   };

//   const handleRemove = async (file) => {
//     try {
//       const deleteEndpoint = `http://localhost:5000/images/${file.fileId}`;

//       const response = await axios.delete(deleteEndpoint);

//       if (response.status === 200) {
//         setFileList((prevFileList) =>
//           prevFileList.filter((item) => item.uid !== file.uid)
//         );
//         message.success("Image deleted successfully.");
//       } else {
//         console.error("Image deletion failed:", response.statusText);
//         message.error("Image deletion failed.");
//       }
//     } catch (error) {
//       console.error("Image deletion failed:", error);
//       message.error("Image deletion failed.");
//     }
//   };

//   const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

//   // Function to handle further processing, you can pass the imageUrls to another component here
//   const handleProcessing = () => {
//     const imageUrls = fileList.map((file) => file.url);
//     handleImageUrls(imageUrls);
//   };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <>
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         onRemove={handleRemove}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>
//       <Modal
//         open={previewOpen}
//         title={previewTitle}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img alt="example" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//       <Button onClick={handleProcessing}>Process Images</Button>
//     </>
//   );
// };

// export default ImageUpload;
