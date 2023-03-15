import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  theme,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const onFinish = (values) => {
  console.log(values);
};

const { useToken } = theme;

function FormEditSheet({ name, fields }) {
  const { token } = useToken();

  return (
    <div className="px-4">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Name">
          <Input value={name} />
        </Form.Item>
        {fields.map((field) => {
          if (field.label != null)
            return (
              <Form.Item label={field.label}>
                <Input
                  value={field.label}
                  suffix={
                    <>
                      <EyeOutlined style={{ color: token["green-7"] }} />
                      <SwapOutlined style={{ color: token.colorPrimary }} />
                      <SettingOutlined style={{ color: token.colorLink }} />
                      <DeleteOutlined style={{ color: token.red }} />
                    </>
                  }
                />
              </Form.Item>
            );
        })}

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <br />
          <Row justify={"center"} align={"middle"}>
            <Col span={12}>
              <Button style={{ backgroundColor: token.colorPrimary }}>
                <span className="font-semibold">Save</span>
              </Button>
            </Col>
            <Col span={12} pull={4}>
              <Button style={{ backgroundColor: token.colorWarning }}>
                <span className="font-semibold">Cancel</span>
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormEditSheet;
