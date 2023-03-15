import BaseFormItem from "@components/base/BaseFormItem";
import { Button, Empty, Form, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const BaseFormAction = ({
  children,
  exceptFieldName,
  initValue,
  handleActions,
  loading,
  haveContinue,
  handleDelete,
  handleEdit,
  handleCreate,
  close,
  ...rest
}) => {
  const [frmInputField] = Form.useForm();
  let nav = useNavigate();
  const [action, setAction] = useState("");
  const onFinish = (values) => {
    const finalValue = { _id: initValue?._id, ...values };
    handleActions(action, finalValue, close);
    if (!handleActions) {
      switch (action) {
        case "EDIT":
          handleEdit(finalValue);
          break;
        case "DELETE":
          handleDelete(finalValue);
          break;

        default:
          break;
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Form onFinishFailed:", errorInfo);
  };

  //   if (!initValue) return <Empty />;
  return (
    <Form
      disabled={loading}
      form={frmInputField}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={initValue}
      autoComplete="off"
      size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <BaseFormItem exceptFieldName={exceptFieldName} />
      {children?.({ form: frmInputField })}
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Space>
          <Button
            onClick={async () => {
              setAction("UPDATE");
              await new Promise((resolve) => setTimeout(resolve, 500));
              //   frmInputField.submit();
            }}
            type="default"
            htmlType="submit"
            loading={rest?.loadingUpdate}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete notification"
            description="Are you sure to delete this?"
            onConfirm={async () => {
              setAction("DELETE");
              await new Promise((resolve) => setTimeout(resolve, 500));
              frmInputField.submit();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button loading={rest?.loadingDetele} type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {haveContinue && (
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                nav(`/projects/${initValue?._id}`);
              }}
            >
              Continue
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default BaseFormAction;
