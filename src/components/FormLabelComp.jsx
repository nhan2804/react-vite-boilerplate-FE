import {
  DeleteOutlined,
  CopyOutlined,
  UndoOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import IconCompA from "./IconComp_A";

const FormLabelComp = ({ children, title, input, ...rest }) => {
  return (
    <Row gutter={24} style={{ width: "1000px" }}>
      <Col span={12} lg={18} xs={16}>
        {title}
      </Col>
      <Col>
        <Space size={12}>
          <IconCompA title="Clearn" size={12} icon={<DeleteOutlined />} />
          <IconCompA title="Pase" size={12} icon={<MenuUnfoldOutlined />} />
          <IconCompA title="Copy" size={12} icon={<CopyOutlined />} />
          <IconCompA title="Undo" size={12} icon={<UndoOutlined />} />
        </Space>
      </Col>
    </Row>
  );
};

export default FormLabelComp;
