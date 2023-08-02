import React from "react";
import { Form, Input, Button } from "antd";

const FullDetails = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.gst = +values.gst;
        values.hsn = +values.hsn;
        values.count = +values.count;

        //console.log(values);
        // Call the onSubmit function passed as a prop and pass the form values
        onSubmit(values);
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari, and Opera */
          ::-webkit-scrollbar {
            display: none;
          }

          // /* Hide scrollbar for IE, Edge, and Firefox */
          // -ms-overflow-style: none;  /* IE and Edge */
          // scrollbar-width: none;  /* Firefox */
        `}
      </style>
      <h2>Full Details</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          label="ASIN code"
          name="asin"
          rules={[{ required: true, message: "Please enter the ASIN code" }]}
        >
          <Input type="text" placeholder="ASIN code" />
        </Form.Item>
        <br />

        <Form.Item
          label="Warranty (years or months)"
          name="warranty"
          rules={[{ required: true, message: "Please enter the warranty" }]}
        >
          <Input type="text" placeholder="warranty" />
        </Form.Item>
        <br />

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please enter the color" }]}
        >
          <Input type="text" placeholder="color" />
        </Form.Item>

        <br />

        <Form.Item
          label="Material"
          name="material"
          rules={[{ required: true, message: "Please enter the material" }]}
        >
          <Input type="text" placeholder="Material" />
        </Form.Item>

        <br />

        <Form.Item
          label="GST"
          name="gst"
          rules={[
            { required: true, message: "Please enter the GST Percentage" },
          ]}
        >
          <Input type="number" placeholder="GST rate" />
        </Form.Item>

        <br />

        <Form.Item
          label="Condition (New or Old)"
          name="condition"
          rules={[
            { required: true, message: "Please enter the condition detail" },
          ]}
        >
          <Input type="text" placeholder="Condition" />
        </Form.Item>

        <br />

        <Form.Item
          label="Gift Wrap (Yes or No)"
          name="gift"
          rules={[
            { required: true, message: "Please enter the Gift wrap detail" },
          ]}
        >
          <Input type="text" placeholder="Gift Wrap" />
        </Form.Item>

        <br />

        <Form.Item label="HSN Code" name="hsn">
          <Input type="number" placeholder="HSN code" />
        </Form.Item>

        <br />

        <Form.Item
          label="Count (provide the number of units in the product)"
          name="count"
        >
          <Input type="number" placeholder="Count" />
        </Form.Item>
        <br />

        <Form.Item
          label="Component (things come in box)"
          name="component"
          rules={[{ required: true, message: "Please enter the Component" }]}
        >
          <Input type="text" placeholder="Component" />
        </Form.Item>

        <br />

        <Form.Item label="Fragile (Yes or No)" name="fragile">
          <Input type="text" placeholder="Fragile" />
        </Form.Item>

        <br />

        <Form.Item label="Shape" name="shape">
          <Input type="text" placeholder="Shape" />
        </Form.Item>

        <br />

        <Form.Item label="Model" name="model">
          <Input type="text" placeholder="Model" />
        </Form.Item>

        <br />

        <Form.Item label="Style" name="style">
          <Input type="text" placeholder="Style" />
        </Form.Item>

        <br />

        <Form.Item
          label="Delivery Time"
          name="delivery"
          rules={[
            { required: true, message: "Please enter the delivery time" },
          ]}
        >
          <Input type="text" placeholder="Delivery Time" />
        </Form.Item>

        <br />

        <Form.Item
          label="Return Policy"
          name="return"
          rules={[
            { required: true, message: "Please enter the Return Policy" },
          ]}
        >
          <Input type="text" placeholder="Return Time" />
        </Form.Item>

        <br />

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FullDetails;
