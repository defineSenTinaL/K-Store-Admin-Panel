import React from 'react';
import { Form, Input, Button } from 'antd';

const FullDetails = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        // Call the onSubmit function passed as a prop and pass the form values
        onSubmit(values);
      })
      .catch((error) => {
        console.error('Form validation error:', error);
      });
  };

  return (
    <>
      <h2>Full Details</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Please enter the brand name' }]}
        >
          <Input placeholder="Brand Name" />
        </Form.Item>
        <br/>

        <Form.Item
          label="Kharidi"
          name="kharidi"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input type="number" placeholder="Kharidi" />
        </Form.Item>

        {/* Add more form fields as needed */}

        <br/>

        <div>
          <Button type="primary" onClick={handleSubmit}>Save</Button>
        </div>
      </Form>
    </>
  );
};

export default FullDetails;
