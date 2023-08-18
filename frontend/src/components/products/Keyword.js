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

const Keyword = ({ data, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  // React.useEffect(() => {
  //   console.log(data);
  //   // if (data) {
  //   //   const keywordData = data.map((keyword, index) => ({
  //   //     id: index.toString(),
  //   //     keyword: keyword,
  //   //   }));
  //   //   form.setFieldsValue({
  //   //     keyword: keywordData,
  //   //   });
  //   // }
  // }, [data, form]);

  return (
    <div>
      <Form
        name="dynamic_form_item"
        form={form}
        initialValues={data}
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
      </Form>
    </div>
  )
}

export default Keyword;
