import { Button, Empty, Form, Input, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormComp = ({
  children,
  source,
  names,
  handleActions,
  loading,
  ...rest
}) => {
  let navigate = useNavigate();
  const [frmInputField] = Form.useForm();
  const [actionState, setActionState] = useState("");

  const onFinish = (values) => {
    setActionState("UPDATE");
    handleActions("UPDATE", { source: { ...source, ...values } });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Form onFinishFailed:", errorInfo);
  };

  if (!source) return <Empty />;
  return (
    <Form
      disabled={loading}
      form={frmInputField}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {names.data?.payload?.map((e, i) => {
        return (
          <Form.Item
            key={i}
            label={e.name}
            name={e.name}
            initialValue={source[e.name]}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input title of field!",
            //   },
            // ]}
          >
            <Input size="small" />
          </Form.Item>
        );
      })}
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Space>
          <Button
            type="default"
            htmlType="submit"
            loading={loading && actionState == "UPDATE"}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete notification"
            description="Are you sure to delete this?"
            onConfirm={() => {
              setActionState("DELETE");
              handleActions("DELETE", { source: source });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              loading={loading && actionState == "DELETE"}
            >
              Delete
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            loading={loading && actionState == "CONTINUE"}
            onClick={() => {
              setActionState("CONTINUE");
              handleActions("CONTINUE", { source: source });
            }}
          >
            Continue
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormComp;
