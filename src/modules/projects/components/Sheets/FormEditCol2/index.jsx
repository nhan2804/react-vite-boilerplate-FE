import React from "react";
import { Form, Select } from "antd";
import { FIELD_TYPE } from "../FormEditCol";
const FormEditCol2 = ({ dataType, form, ...rest }) => {
  const type = Form.useWatch("type", form);
  return (
    <>
      <Form.Item label="Data type" name={"type"}>
        <Select>
          {Object.keys(FIELD_TYPE).map((key, index) => {
            return (
              <Select.Option key={FIELD_TYPE[key].mode || key}>
                {FIELD_TYPE[key].mode || key}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {type === "LIST" && (
        <Form.Item label="Option" name={"options"}>
          <Select mode="tags" placeholder="Tags Mode" {...rest} />
        </Form.Item>
      )}
    </>
  );
};

export default FormEditCol2;
