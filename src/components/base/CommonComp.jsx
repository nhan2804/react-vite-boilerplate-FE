import {
  Col,
  Popover,
  Card,
  Typography,
  theme,
  Space,
  Tooltip,
  Switch,
  Input,
  Select,
  Tag,
  DatePicker,
  TimePicker,
  Rate,
  Upload,
  Modal,
  Button,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const { Text } = Typography;
const { Meta } = Card;
const { useToken } = theme;

/* Create one block element with background & border & hover effect in Col of antd
  |***************|
  |               |
  |_______________|
*/
const ColBlockComp = ({ children, ...rest }) => {
  return (
    <Col span={6} lg={6} md={8} sm={12} xs={24} {...rest}>
      <div
        style={{
          background: rest.style?.background ?? "#ffffff",
          padding: "8px 5px",
          borderRadius: "3px",
          border: rest.style?.border ?? "1px solid rgba(9, 30, 66, 0.1)",
          textAlign: rest.style?.textAlign ?? "left",
        }}
        className="hover"
      >
        {children}
      </div>
    </Col>
  );
};

const PopoverComp = ({ children, title = "", content, ...rest }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (active) => {
    setOpen(active);
  };

  return (
    <Popover
      placement="topLeft"
      content={content}
      title={title}
      trigger="click"
      open={open}
      onOpenChange={handleOpen}
    >
      {children}
    </Popover>
  );
};

const MetaComp = ({ children, title, desc, ...rest }) => {
  const { token } = useToken();
  return (
    <Meta
      title={
        <Text
          strong
          style={{
            fontSize: "0.9em",
            lineHeight: "5px",
            marginBottom: "5px",
            color: rest.props?.color,
          }}
        >
          {title}
        </Text>
      }
      description={
        <Text
          style={{
            fontSize: "0.8em",
            color:
              rest.props?.subcolor ?? rest.color ?? token.colorTextSecondary,
          }}
        >
          {desc}
        </Text>
      }
    />
  );
};

const EllipsisComp = ({ suffixCount, children, start }) => {
  if (!children) {
    start = "";
  } else {
    start = children.slice(0, suffixCount).trim();
    return <Tooltip title={children}>{start}</Tooltip>;
  }
  return <></>;
  // const start = children.slice(0, suffixCount).trim();
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditableCellComp = ({
  children,
  editable,
  field,
  val,
  row,
  rowIndex,
  dataIndex,
  onValueChange,
  ...rest
}) => {
  const [editing, setEditing] = useState(false);
  const [cellVal, setCellVal] = useState(val);
  const inputRef = useRef(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    if (editing != -1) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const save = () => {
    try {
      onValueChange &&
        onValueChange({ cellVal, row, rowIndex, field, dataIndex });
      setEditing(false);
    } catch (errInfo) {
      // console.log("Save failed:", errInfo);
    }
  };
  console.log({ mode: field });

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      field.type == "BOOLEAN" ? (
        <Switch
          ref={inputRef}
          size="small"
          checkedChildren={field.type.labels.true}
          unCheckedChildren={field.type.labels.false}
          defaultChecked={cellVal}
          onChange={(e) => {
            setCellVal(e);
          }}
        />
      ) : field.type == "TEXT" ? (
        <Input
          ref={inputRef}
          defaultValue={cellVal}
          onBlur={(e) => {
            setCellVal(e.target.value);
          }}
        />
      ) : field.type === "LONG_TEXT" ? (
        <TextArea
          ref={inputRef}
          rows={4}
          defaultValue={cellVal}
          onBlur={(e, i) => {
            setCellVal(e.target.value);
          }}
        />
      ) : field.type == "LIST" ? (
        <CellListComp
          val={cellVal}
          options={field.type?.source?.map((l, i) => {
            return {
              label: l,
              value: l,
            };
          })}
          onValueChange={(e) => {
            setCellVal(e);
          }}
        />
      ) : field.type == "DATE" ? (
        <DatePicker
          defaultValue={cellVal}
          ref={inputRef}
          showTime
          className="text-xs"
        />
      ) : field.type == "EMAIL" ? (
        <Input
          ref={inputRef}
          defaultValue={cellVal}
          onBlur={(e) => {
            setCellVal(e.target.value);
          }}
        />
      ) : field.type == "RATE" ? (
        <div className="pd-2 text-center">
          <Rate className="text-xs" />
        </div>
      ) : field.type == "LINK" ? (
        <div className="pd-2 text-center">
          <Input
            ref={inputRef}
            defaultValue={cellVal}
            onBlur={(e) => {
              setCellVal(e.target.value);
            }}
          />
        </div>
      ) : field.type == "ATTACHMENT" ? (
        <div className="pd-2 text-center">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            defaultFileList={[...fileList]}
            onPreview={handlePreview}
            className="upload-list-inline"
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
      ) : field.type == "PHONE" ? (
        <div className="pd-2 text-center">
          <Input
            ref={inputRef}
            defaultValue={cellVal}
            onBlur={(e) => {
              setCellVal(e.target.value);
            }}
          />
        </div>
      ) : (
        cellVal
      )
    ) : field.type == "BOOLEAN" ? (
      cellVal ? (
        field.type.labels.true
      ) : (
        field.type.labels.false
      )
    ) : field.type == "LONG_TEXT" ? (
      <div style={{ width: "100%" }}>
        <EllipsisComp suffixCount={25}>{cellVal}</EllipsisComp>
      </div>
    ) : field.type == "LIST" ? (
      <Space wrap size={[0, 0]}>
        {cellVal?.length > 0 ? (
          cellVal?.map((l, i) => {
            return (
              <Tag key={`11_${i}`} style={{ lineHeight: "normal" }}>
                {l}
              </Tag>
            );
          })
        ) : (
          <div style={{ width: "100%" }}></div>
        )}
      </Space>
    ) : field.type == "DATE" ? (
      <DatePicker
        defaultValue={cellVal}
        className="text-xs"
        showTime
        size="small"
      />
    ) : field.type == "RATE" ? (
      <div className="pd-2 text-center">
        <Rate className="text-xs" />
      </div>
    ) : field.type == "LINK" ? (
      <div className="pd-2 text-center">
        <span className="text-link">{cellVal}</span>
      </div>
    ) : field.type == "PHONE" ? (
      <div className="pd-2 text-center">
        <span className="text-link">{cellVal}</span>
      </div>
    ) : field.type == "EMAIL" ? (
      <div className="pd-2 text-center">
        <span className="text-link">{cellVal}</span>
      </div>
    ) : field.type == "ATTACHMENT" ? (
      <div className="pd-2 text-center">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          defaultFileList={[...fileList]}
          onPreview={handlePreview}
          className="upload-list-inline"
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </div>
    ) : (
      cellVal
    );
  }
  return (
    <button aria-hidden onClick={() => setEditing(true)} onBlur={() => save()}>
      {childNode}
    </button>
  );
};

const CellListComp = ({ children, val, options, onValueChange, ...rest }) => {
  return (
    <Select
      size="small"
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      // placeholder="Please select"
      defaultValue={val}
      onChange={onValueChange}
      options={options}
    />
  );
};

const TextI18 = ({ k }) => {
  return k;
  // const { t, i18n } = useTranslation();
  // return `${process.env.REACT_APP_DEBUG && "〈"}${t(k)}${
  //   process.env.REACT_APP_DEBUG && "〉"
  // }`;
};

export {
  ColBlockComp,
  PopoverComp,
  MetaComp,
  EditableCellComp,
  EllipsisComp,
  TextI18,
};
