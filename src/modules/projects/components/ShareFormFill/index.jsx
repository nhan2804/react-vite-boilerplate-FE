import useGenerateShareFormFill from "@modules/projects/hooks/mutate/useGenerateShareFormFill";
import { Button, Checkbox, Col, Form, Row, Typography } from "antd";

import React from "react";
const { Paragraph } = Typography;
const ShareFormFill = ({ projectId, tableId, fields }) => {
  const { mutate: generate, data } = useGenerateShareFormFill(
    projectId,
    tableId
  );
  const [form] = Form.useForm();
  const onFinish = (values) => {
    generate({ formData: values });
    console.log({ values });
  };
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ editAll: true }}
        form={form}
      >
        <Form.Item
          name={"editAll"}
          valuePropName="checked"
          label="Được phép tạo tất cả trường trong form (cho sau này)"
        >
          <Checkbox value={true}>Tất cả trường</Checkbox>
        </Form.Item>
        <p>Hoặc</p>
        <Form.Item name={"editFields"} label="Chọn trường thủ công">
          <Checkbox.Group
            style={{
              width: "100%",
            }}
          >
            <Row>
              {fields?.map((e) => (
                <Col key={e?._id} span={8}>
                  <Checkbox value={e?.name}>
                    {e?.title} - {e?.name}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Tạo link
          </Button>
        </Form.Item>
      </Form>

      {data && (
        <>
          {" "}
          <Paragraph copyable>
            {"http://localhost:3000/form/shared-form-fill/" +
              data?.payload?._id}
          </Paragraph>
        </>
      )}
    </div>
  );
};

export default ShareFormFill;
