import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  QRCode,
  Rate,
  Row,
  Select,
  Switch,
  theme,
  Upload,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
  SwapOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
};
const onFinish = (values) => {
  console.log(values);
};
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const { useToken } = theme;

function FormEditType({ fields }) {
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
        {Object.keys(fields).map((key, index) => {
          if (
            fields[key].mode === "SINGLE_TEXT" ||
            fields[key].mode === "LINK" ||
            fields[key].mode === "EMAIL" ||
            fields[key].mode === "PHONE" ||
            fields[key].mode === "SCRIPT"
          )
            return (
              <Form.Item label={fields[key].mode}>
                <Input placeholder="Type text" />
              </Form.Item>
            );
          if (fields[key].mode === "LONG_TEXT")
            return (
              <Form.Item label={fields[key].mode}>
                <TextArea placeholder="Type text area" />
              </Form.Item>
            );
          if (fields[key].mode === "ATTACHMENT")
            return (
              <Form.Item label={fields[key].mode}>
                <Upload {...props}>
                  <Button className="text-xs" icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            );
          if (fields[key].mode === "RATE")
            return (
              <Form.Item label={fields[key].mode}>
                <Rate className="text-xs" />
              </Form.Item>
            );
          if (fields[key].mode === "LIST")
            return (
              <Form.Item label={fields[key].mode}>
                <Select
                  defaultValue="Type select"
                  //   style={{
                  //     width: 120,
                  //   }}
                  //   onChange={handleChange}
                  options={[]}
                />
              </Form.Item>
            );
          if (fields[key].mode === "BOOLEAN")
            return (
              <Form.Item label={fields[key].mode}>
                <Switch defaultChecked />
              </Form.Item>
            );
          if (fields[key].mode === "NUMBER")
            return (
              <Form.Item label={fields[key].mode}>
                <InputNumber min={1} max={10} defaultValue={3} />
              </Form.Item>
            );
          if (fields[key].mode === "QR")
            return (
              <Form.Item label={fields[key].mode}>
                <QRCode value="https://ant.design/" size={100}/>
              </Form.Item>
            );
            if (fields[key].mode === "DATE")
            return (
              <Form.Item label={fields[key].mode}>
               <DatePicker showTime size={"small"}/>
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

export default FormEditType;
