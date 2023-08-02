import React from "react";
import { Form, Input, Button, Space } from "antd";

const Variance = ({ onSubmit }) => {
  const [form] = Form.useForm();

  // const handleFormSubmit = () => {
  //   form.validateFields().then((values) => {
  //     console.log(values);
  //     onSubmit(values);
  //   });
  // };

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      // Transform the Form.List values into a structured format
      const variances = values.variance.map((v) => ({
        size: v.size,
        color: v.color,
        quantity: v.quantity,
        style: v.style,
        material: v.material,
      }));
      console.log(variances);
      onSubmit(variances);
    });
  };

  return (
    <div>
      <Form form={form}>
        <Form.List name="variance">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space
                  key={`${field.name}-${field.fieldKey}`}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "size"]}
                    fieldKey={[field.fieldKey, "size"]}
                    key={`${field.name}-${field.fieldKey}-size`}
                  >
                    <Input type="text" placeholder="Size" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "color"]}
                    fieldKey={[field.fieldKey, "color"]}
                    key={`${field.name}-${field.fieldKey}-color`}
                  >
                    <Input type="text" placeholder="Color" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "quantity"]}
                    fieldKey={[field.fieldKey, "quantity"]}
                    key={`${field.name}-${field.fieldKey}-quantity`}
                  >
                    <Input type="number" placeholder="Quantity" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "style"]}
                    fieldKey={[field.fieldKey, "style"]}
                    key={`${field.name}-${field.fieldKey}-style`}
                  >
                    <Input type="text" placeholder="Style" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "material"]}
                    fieldKey={[field.fieldKey, "material"]}
                    key={`${field.name}-${field.fieldKey}-material`}
                  >
                    <Input type="text" placeholder="Material" />
                  </Form.Item>
                  <Button type="default" onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Variance
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" onClick={handleFormSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Variance;
