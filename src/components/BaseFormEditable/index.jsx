import WrapFormItem from "@components/WrapFormItem";
import { Form, Rate, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
const MappingValueInputComp = ({ type, value }) => {
  if (type === "TEXT") return value || <>&nbsp;</>;
  if (type === "SWITCH") return <Switch checked={!!value} />;
  if (type === "LIST") return value || <>&nbsp;</>;
  if (type === "RATE") return <Rate disabled />;
  if (type === "DATE") return value || dayjs(value).toString();
  if (type === "DATE_TIME") return value || dayjs(value).toString();
  return value || <>&nbsp;</>;
};

const EditableInline = ({
  type = "TEXT",
  onBlur,
  onUpdate,
  value,
  nameField,
  isEditDirectly,
  options,
  ...rest
}) => {
  const [form] = Form.useForm();
  const ref = useRef();
  useEffect(() => {
    //mấy đoạn này xử lý sâu tý nữa thì đẹp
    if (!isEditDirectly) {
      ref?.current?.focus();
    }
  }, [type, isEditDirectly]);
  const initValue =
    type === "DATE" || type === "DATE_TIME"
      ? value
        ? dayjs(value)
        : null
      : value;
  const handleSave = () => {
    const newV = form.getFieldValue(nameField);
    //check value was changed
    if (value !== newV) {
      // Cần xử lý đoạn này, nếu fail thì phải fallback về lại value cũ
      onUpdate({ [nameField]: newV }, newV);
    }
    onBlur();
  };

  return (
    <Form
      initialValues={initValue ? { [nameField]: initValue } : {}}
      form={form}
    >
      <WrapFormItem
        onChange={type === "SWITCH" ? handleSave : () => {}} //hot fix
        onBlur={handleSave}
        ref={ref}
        name={nameField}
        type={type}
        options={options}
        {...rest}
      />
    </Form>
  );
};
// đặt tên sai :((
const BaseFormEditable = ({
  onUpdate,
  nameField,
  options,
  value,
  type,
  ...rest
}) => {
  const [editable, setEdiable] = useState(false);
  const [stateValue, setStateValue] = useState(value);
  const handleNewValue = (dataNewValue, newValue) => {
    setStateValue(newValue);
    onUpdate(dataNewValue);
  };

  const isEditDirectly = type === "SWITCH" || type === "RATE";
  // type === "DATE" ||
  // type === "DATE_TIME";
  const isEdit = editable || isEditDirectly;

  return (
    <>
      {isEdit ? (
        <EditableInline
          isEditDirectly={isEditDirectly}
          options={options}
          type={type}
          onUpdate={handleNewValue}
          value={stateValue}
          nameField={nameField}
          onBlur={() => setEdiable(false)}
          {...rest}
        />
      ) : (
        <div
          className="w-full h-full"
          aria-hidden
          onClick={() => setEdiable(true)}
        >
          <MappingValueInputComp type={type} value={stateValue} />
        </div>
      )}
    </>
  );
};

export default BaseFormEditable;
