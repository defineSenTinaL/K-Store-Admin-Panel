import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { 
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const Keyword = ({onSubmit}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };
  
  return (
    <div><Form
    name="dynamic_form_item"
    form={form}
    {...formItemLayoutWithOutLabel}
    style={{
      maxWidth: 600,
    }}
  >
    <Form.List
      name="keyword"
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(new Error('At least 2 Keywords'));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Keyword' : ''}
              required={false}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter Keyword or delete this field.",
                  },
                ]}
                noStyle
              >
                <Input
                  placeholder="Keyword"
                  style={{
                    width: '60%',
                  }}
                />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{
                width: '60%',
              }}
              icon={<PlusOutlined />}
            >
              Add Point
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" onClick={handleFormSubmit}>
        Save
      </Button>
    </Form.Item>
  </Form></div>
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
