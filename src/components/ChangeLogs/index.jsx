import {
  Button, Col, List,
  Row,
  Space,
  Tag,
  theme,
  Typography
} from "antd";
import React from "react";
const { Text, Link } = Typography;
const { useToken } = theme;
const data = [
  { row: "No.10", change: { AGE: "10->29", DOB: "null" } },
  { row: "No.14", change: { AGE: "10->29", DOB: "null" } },
  { row: "No.18", change: { AGE: "10->29", DOB: "null" } },
  { row: "No.2", change: { AGE: "10->29", DOB: "null" } },
  {
    col: "AGE",
    change: { datatype: "TEXT -> NUMBER", name: "Tuoi -> AGE" },
  },
];
function ChangeLogs() {
  const { token } = useToken();

  return (
    <div className="px-4">
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Space align="center" size={30}>
              <span className="font-semibold" style={{ color: token.red }}>
                {item.row || item.col}
              </span>

              <span>
                {Object.keys(item.change).map((key, index) => {
                  return (
                    <Tag className="ml-4">
                      {key + " : " + item.change[key]} 
                    </Tag>
                  );
                })}
              </span>
            </Space>
          </List.Item>
        )}
      />
      <br />
      <Row justify={"center"} align={"middle"}>
        <Col span={12} push={7}>
          <Button style={{ backgroundColor: token.colorPrimary }}>
            <span className="font-semibold">Save</span>
          </Button>
        </Col>
        <Col span={12} push={0}>
          <Button style={{ backgroundColor: token.colorWarning }}>
            <span className="font-semibold">Cancel</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ChangeLogs;
