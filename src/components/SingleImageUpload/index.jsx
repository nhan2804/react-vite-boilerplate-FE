import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

import { BASE_URL_UPLOAD } from "@config/axios";
// import convertImage2Jpg, { convertImage2JpgV2 } from "@helper/image2jpg";
import { useAppSelector } from "@hooks/reduxHook";
import Form from "antd/es/form";
import message from "antd/es/message";
import Upload from "antd/es/upload";
import React, { forwardRef, useState } from "react";
import { useParams } from "react-router";
const SingleImageUpload = (
  {
    label,
    name,
    maxWidth,
    maxHeight,
    resize = true,
    projectId: projectIdProp,
    ...rest
  },
  ref
) => {
  const { projectId = projectIdProp } = useParams();
  const token = useAppSelector((state) => state.auth?.token);

  const [loading, setLoading] = useState(false);
  const [urlImage, setImageUrl] = useState("");
  const getLink = (event) => {
    return event?.fileList[0]?.response?.url;
  };
  async function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt32M = file.size / 1024 / 1024 < 32;
    if (!isLt32M) {
      message.error("Image must smaller than 32MB!");
      return false;
    }
    if (!resize) return file;
    return await file;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setImageUrl("");
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info?.file?.response?.url);

      setLoading(false);
    }
  };
  return (
    <Form.Item
      getValueFromEvent={getLink}
      {...{ name, label }}
      getValueProps={(value) => setImageUrl(value)}
    >
      <Upload
        {...rest}
        method="POST"
        maxCount={1}
        value="image"
        accept="image/*"
        action={`${BASE_URL_UPLOAD}api/upload?projectId=${projectId || ""}`}
        // action={`http://localhost:6001/api/upload`}
        name="file"
        headers={{ Authorization: `Bearer ${token}` }}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {urlImage ? (
          <img src={urlImage} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Form.Item>
  );
};

export default forwardRef(SingleImageUpload);
