import {
  BgColorsOutlined,
  FontColorsOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Space, Tooltip } from "antd";
import React from "react";
import TableBrandListComp from "./TableBrandListComp";
import { TableEmojiListComp, TableTransListComp } from "./TableTransListComp";

const DevToolActions = ({ setBottomDrawerState }) => {
  return (
    <React.Fragment>
      Dev{": "}
      <Space.Compact>
        <Tooltip title="Dev tool brand table">
          <Button
            size="small"
            icon={<BgColorsOutlined />}
            onClick={() =>
              setBottomDrawerState({
                open: true,
                title: "Dev tool brand table",
                content: (
                  <Row>
                    <Col span={24}>
                      <TableBrandListComp />
                    </Col>
                  </Row>
                ),
              })
            }
          />
        </Tooltip>
        <Tooltip title="Dev tool translate table">
          <Button
            size="small"
            icon={<FontColorsOutlined />}
            onClick={() =>
              setBottomDrawerState({
                open: true,
                title: "Dev tool translate table",
                content: (
                  <Row>
                    <Col span={24}>
                      <TableTransListComp />
                    </Col>
                  </Row>
                ),
              })
            }
          />
        </Tooltip>
        <Tooltip title="Dev tool emoji table">
          <Button
            size="small"
            icon={<AliwangwangOutlined />}
            onClick={() =>
              setBottomDrawerState({
                open: true,
                title: "Dev tool emoji table",
                content: (
                  <Row>
                    <Col span={24}>
                      <TableEmojiListComp />
                    </Col>
                  </Row>
                ),
              })
            }
          />
        </Tooltip>
      </Space.Compact>
    </React.Fragment>
  );
};

export default DevToolActions;
