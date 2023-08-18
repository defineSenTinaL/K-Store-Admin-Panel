import React, {useEffect} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Space } from 'antd';

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

const MoreDetails = ({ data, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      values.productDimension.length = +values.productDimension.length;
      values.productDimension.breadth = +values.productDimension.breadth;
      values.productDimension.height = +values.productDimension.height;
      values.packageDimension.length = +values.packageDimension.length;
      values.packageDimension.breadth = +values.packageDimension.breadth;
      values.packageDimension.height = +values.packageDimension.height;
      onSubmit(values);
    });
  };

  // useEffect(() => {
  //   console.log(data)
  //   // if (data) {
  //   //   form.setFieldsValue({
  //   //     productDimension: {
  //   //       length: data.productDimension.length.toString(),
  //   //       breadth: data.productDimension.breadth.toString(),
  //   //       height: data.productDimension.height.toString(),
  //   //     },
  //   //     packageDimension: {
  //   //       length: data.packageDimension.length.toString(),
  //   //       breadth: data.packageDimension.breadth.toString(),
  //   //       height: data.packageDimension.height.toString(),
  //   //     },
  //   //   });
  //   // }
  // }, [data, form]);

  return (
    <Form form={form} initialValues={data}>
      <Form.Item label="Product Dimension" name="productDimension">
        <Input.Group compact>
          <Space>
            <Form.Item name={["productDimension", 'length']} noStyle>
              <Input type='number' placeholder="Length" />
            </Form.Item>
            <Form.Item name={["productDimension", 'breadth']} noStyle>
              <Input type='number' placeholder="Breadth" />
            </Form.Item>
            <Form.Item name={["productDimension", 'height']} noStyle>
              <Input type='number' placeholder="Height" />
            </Form.Item>
          </Space>
        </Input.Group>
      </Form.Item>

      <Form.Item label="Package Dimension" name="packageDimension">
        <Input.Group compact>
          <Space>
            <Form.Item name={["packageDimension", 'length']} noStyle>
              <Input type='number' placeholder="Length" />
            </Form.Item>
            <Form.Item name={["packageDimension", 'breadth']} noStyle>
              <Input type='number' placeholder="Breadth" />
            </Form.Item>
            <Form.Item name={["packageDimension", 'height']} noStyle>
              <Input type='number' placeholder="Height" />
            </Form.Item>
          </Space>
        </Input.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleFormSubmit}>
          Save
        </Button>
      </Form.Item>

    </Form>
  );
};

export default MoreDetails;
