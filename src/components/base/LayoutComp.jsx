import { Col, Form, Input, Row, Space } from "antd";

const LayoutComp = ({ children, source, ...rest }) => {
  if (source.length <= 0) return <></>;
  return source.map((e, i) => {
    return e.type == "ROW" ? (
      <Row style={{ border: "0px dashed lightgray" }}>
        <LayoutComp source={e.children} />
      </Row>
    ) : e.type == "COL" ? (
      <Col style={{ border: "0px dashed lightgray" }}>
        <LayoutComp source={e.children} />
      </Col>
    ) : e.type == "GRD" ? (
      <Space direction="vertical">
        <LayoutComp source={e.children} />
      </Space>
    ) : e.type == "FOM" ? (
      <Form.Item
        label={e.value.component.name}
        name={e.value.component.name}
        // rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input size="small" placeholder={e.value.component.name} />
      </Form.Item>
    ) : (
      { e }
    );
  });
};

export default LayoutComp;
