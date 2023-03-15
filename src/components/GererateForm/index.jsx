import WrapFormItem from "@components/WrapFormItem";
import { Button, Form } from "antd";
import React from "react";

const GererateForm = ({ initValue, onChange, hideFields, fields }) => {
  const [frmInputField] = Form.useForm();
  const onFinish = (value) => {
    onChange(value);
  };
  const lastFields = fields?.filter((e) => !hideFields?.includes(e?.name));
  console.log({ lastFields });
  return (
    <Form
      layout="vertical"
      form={frmInputField}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={initValue}
      autoComplete="off"
      size="small"
      onFinish={onFinish}
    >
      {lastFields?.map((e) => (
        <WrapFormItem name={e?.name} type={e?.type} label={e?.title} />
      ))}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GererateForm;
