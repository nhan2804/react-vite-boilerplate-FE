import { Col, Form, Input, Row, Select, Table, Button } from "antd";
import FormLabelComp from "./FormLabelComp";

const FormFilterComp = ({ children, title, input, ...rest }) => {
  return (
    <Row justify="center">
      <Col span={8} sm={12} xs={24}>
        <Form
          name="basic"
          layout="vertical"
          // labelCol={{ span: 16 }}
          wrapperCol={{ span: 24 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="note"
            label={<FormLabelComp title={"Search in table"} input={this} />}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Table
            size="small"
            pagination={false}
            showHeader={true}
            bordered
            // rowKey={(record) => record.index}
            dataSource={[
              { where: "AND", field: "Name", condition: "=", values: "U" },
              { where: "OR", field: "Title", condition: "!=", values: "T" },
            ]}
            columns={[
              {
                title: "Where",
                dataIndex: "where",
                render: (tags) => (
                  <Select
                    size="small"
                    defaultValue="AND"
                    style={{ width: 69 }}
                    options={[
                      {
                        value: "AND",
                        label: "AND",
                      },
                      {
                        value: "OR",
                        label: "OR",
                      },
                    ]}
                  />
                ),
              },
              {
                title: "Field",
                dataIndex: "field",
              },
              {
                title: "Condition",
                dataIndex: "condition",
                render: (tags) => (
                  <Select
                    size="small"
                    defaultValue="="
                    style={{ width: 69 }}
                    options={[
                      {
                        value: "EQ",
                        label: "=",
                      },
                      {
                        value: "LT",
                        label: "<",
                      },
                      {
                        value: "GT",
                        label: ">",
                      },
                      {
                        value: "LTE",
                        label: "<=",
                      },
                      {
                        value: "GTE",
                        label: ">=",
                      },
                      {
                        value: "IN",
                        label: "IN",
                      },
                      {
                        value: "LK",
                        label: "LIKE",
                      },
                    ]}
                  />
                ),
              },
              {
                title: "Values",
                dataIndex: "values",
                render: (tags) => <Input />,
              },
            ]}
          />

          <Form.Item
            wrapperCol={{ offset: 0, span: 24 }}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Button size="small" type="primary" htmlType="submit">
              Apply
            </Button>
            <Button size="small" type="primary" htmlType="button">
              Add Filter
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default FormFilterComp;
