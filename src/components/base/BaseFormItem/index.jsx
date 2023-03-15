import { Form, Input } from "antd";
import React from "react";

const BaseFormItem = ({ exceptFieldName = [] }) => {
  const BASE_FIELD = [
    { name: "title" },
    { name: "name" },
    { name: "description" },
  ];
  const FINAL_BASE_FIELD = BASE_FIELD?.filter(
    (e) => !exceptFieldName?.includes(e?.name)
  );
  return (
    <>
      {FINAL_BASE_FIELD.map((e) => (
        <Form.Item key={e?.name} label={e?.label || e?.name} name={e?.name}>
          <Input size="small" />
        </Form.Item>
      ))}
    </>
  );
};

export default BaseFormItem;
