import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Select, Space, Layout, Tooltip, theme } from "antd";
import React from "react";

const { Content } = Layout;
const { useToken } = theme;

export const EXPRESSION_SORT = {
  ASC: "ASC",
  DESC: "DESC",
};

const handleParseExpressionSort = (expression) => {
  let sort = {};
  expression.forEach((e) => {
    if (!sort[e.name]) sort[e.name] = { ASC: 1, DESC: -1 }[e.sort];
  });
  return sort;
};

const SortExpressionComp = ({ names, source, handleSetSource, ...rest }) => {
  const { token } = useToken();
  return (
    <Content
      className="content"
      style={{
        borderRadius: "5px",
        // border: "1px solid rgba(9, 30, 66, 0.1)",
        // background: "white",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <div>
        Sort order by following{" "}
        <Tooltip title="Add sort">
          <PlusCircleFilled
            style={{ color: token.colorPrimaryBgHover }}
            onClick={() => {
              source.push({ name: names[0].name, sort: "ASC" });
              handleSetSource([...source]);
            }}
          />
        </Tooltip>
      </div>
      {source.map((element, i) => {
        return (
          <div key={i}>
            <Space size={3}>
              <Select
                size="small"
                value={element.name.isEmpty() ? names[0] : element.name.trim()}
                style={{ width: 120 }}
                options={names.map((e) => {
                  return {
                    value: e.name,
                    label: e.name,
                  };
                })}
                onChange={(v, e) => {
                  element.name = e.value;
                  handleSetSource([...source]);
                }}
              />
              <Select
                size="small"
                value={element.sort ?? EXPRESSION_SORT.ASC}
                style={{ width: 69 }}
                options={Object.entries(EXPRESSION_SORT).map(
                  ([key, val], i) => {
                    return {
                      value: val,
                      label: val,
                    };
                  }
                )}
                onChange={(v, e) => {
                  element.sort = e.value;
                  handleSetSource([...source]);
                }}
              />
              <Tooltip title="Remove sort">
                <MinusCircleFilled
                  style={{ color: token.colorError }}
                  onClick={() => {
                    source.splice(i, 1);
                    handleSetSource([...source]);
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        );
      })}
    </Content>
  );
};

export { SortExpressionComp, handleParseExpressionSort };
