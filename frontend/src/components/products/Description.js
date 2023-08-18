import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

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

const Description = ({ data, onSubmit }) => {
  const [form] = Form.useForm();


  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  // React.useEffect(() => {
  //   console.log(data)
  //   // if (data) {
  //   //   form.setFieldsValue({
  //   //     description: data.description,
  //   //     bullet: data.bullet,
  //   //   });
  //   // }
  // }, [data]);

  return (
    <div><Form
    name="dynamic_form_item"
    form={form}
    initialValues={data}
    {...formItemLayoutWithOutLabel}
    style={{
      maxWidth: 600,
    }}
  >
            <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter description" },
          ]}
        >

          <TextArea type="text" rows={6} placeholder="Description" />
        </Form.Item>
    <Form.List
      name="bullet"
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(new Error('At least 2 points'));
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
              label={index === 0 ? 'Bullet Points' : ''}
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
                    message: "Please enter Bullet Points or delete this field.",
                  },
                ]}
                noStyle
              >
                <Input
                  placeholder="Bullet Point"
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

export default Description;