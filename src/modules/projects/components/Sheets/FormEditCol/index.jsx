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
import React, { useState } from "react";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const onFinish = (values) => {
  console.log(values);
};

export const FIELD_TYPE2 = [
  {
    type: "TEXT",
    extras: {},
  },
];
export const FIELD_TYPE = {
  TEXT: {
    mode: "TEXT",
    default: "",
    min: -1,
    max: 14,
    require: false,
  },
  LONG_TEXT: {
    mode: "LONG_TEXT",
    default: "",
    min: -1,
    max: 15,
    require: false,
  },
  SWITCH: {},

  BOOLEAN: {
    mode: "BOOLEAN",
    default: true,
    labels: { true: "TRUE", false: "FALSE" },
    require: false,
  },
  DATE: {
    mode: "DATE",
    default: null,
    min: -1,
    max: -1,
    format: "TIME", // DATE, DATETIME, TIME,
    require: false,
  },
  DATE_TIME: {},
  NUMBER: {
    mode: "NUMBER",
    default: 0,
    min: -1,
    max: 18,
    negative: true,
    require: false,
  },
  IMAGE: {
    mode: "IMAGE",
    gallery: false,
    cameraOnly: false,
    require: false,
  },
  GPS: { mode: "GPS", fromMap: true, require: false },
  QR: { mode: "QR", default: "", onlyCamera: false, require: false },
  RECORDER: { mode: "RECORDER", onlyMic: false, require: false },
  ATTACHMENT: { mode: "ATTACHMENT", require: false },
  RATE: { mode: "RATE", default: 0, display: "START", require: false },
  EMAIL: { mode: "EMAIL", default: "", require: false },
  PHONE: { mode: "PHONE", default: "", require: false },
  LINK: { mode: "LINK", default: "", require: false },
  LIST: {
    mode: "LIST",
    source: [],
    multi: true,
    require: false,
  },

  RECORD: { mode: "RECORD", sheetName: null, multi: true, require: false },
  SCRIPT: {
    mode: "SCRIPT",
    code: "",
    display: "TEXT", //TEXT, BUTON, LINK, ICON
    lable: "",
  },
};
const { useToken } = theme;

function FormEditCol({ name, datatype }) {
  const [dataProp, setDataProp] = useState(FIELD_TYPE[datatype]);
  console.log(dataProp);
  const handleDataTypeChange = (value) => {
    setDataProp(FIELD_TYPE[value]);
  };
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
        <Form.Item label="Data type">
          <Select defaultValue={datatype} onChange={handleDataTypeChange}>
            {Object.keys(FIELD_TYPE).map((key, index) => {
              return (
                <Select.Option key={FIELD_TYPE[key].mode}>
                  {FIELD_TYPE[key].mode}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* {Object.keys(FIELD_TYPE).map((key, index) => {
          if (FIELD_TYPE[key].mode === datatype || FIELD_TYPE[key].mode === dataType) {
            return ( */}
        <Form.Item label="Default">
          <Input value={dataProp.default} />
        </Form.Item>
        <Form.Item label="Min">
          <Input value={dataProp.min} />
        </Form.Item>
        <Form.Item label="Max">
          <Input value={dataProp.max} />
        </Form.Item>
        <Form.Item label="Require">
          <Input value={dataProp.require} />
        </Form.Item>
        {/* );
          }
        })} */}
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

export default FormEditCol;
