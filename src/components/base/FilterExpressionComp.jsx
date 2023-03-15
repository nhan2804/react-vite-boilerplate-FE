import {
  MinusCircleFilled,
  UpSquareFilled,
  DownSquareFilled,
  PlusCircleFilled,
  DiffFilled,
} from "@ant-design/icons";
import { Badge, Input, Select, Space, Layout, Tooltip, theme } from "antd";
import React from "react";

const { Content } = Layout;
const { useToken } = theme;

export const EXPRESSION_CONDITION = {
  EQ: "=",
  LT: ">",
  GT: "<",
  LTE: "<=",
  GTE: ">=",
  IN: "[]",
  LIKE: "%",
  LIKEIN: "[%]",
};

const handlePath = (bind, path) => {
  var o = bind,
    parents = undefined,
    indx = -1;
  path.split("¶").forEach((e) => {
    parents = o;
    o = o[e];
    indx = e;
  });
  return { parents, o, indx };
};

const handleParseExpression = (expression) => {
  let o = [[]],
    e = [expression];

  while (e.length > 0) {
    let currE = e.pop();

    if (currE.name) {
      // If current expression is a leaf
      let temp = {};
      if (currE.condition == EXPRESSION_CONDITION.EQ) {
        temp[currE.name] = currE.values;
      } else if (currE.condition == EXPRESSION_CONDITION.LT) {
        temp[currE.name] = { $lt: currE.values };
      } else if (currE.condition == EXPRESSION_CONDITION.GT) {
        temp[currE.name] = { $gt: currE.values };
      } else if (currE.condition == EXPRESSION_CONDITION.LTE) {
        temp[currE.name] = { $lte: currE.values };
      } else if (currE.condition == EXPRESSION_CONDITION.GTE) {
        temp[currE.name] = { $gte: currE.values };
      } else if (currE.condition == EXPRESSION_CONDITION.IN) {
        temp[currE.name] = {
          $in: currE.values
            .replaceAll(",", ", ")
            .replaceAll("?", ",")
            .split(","),
        };
      } else if (currE.condition == EXPRESSION_CONDITION.LIKE) {
        temp[currE.name] = { $regex: currE.values, $options: "i" };
      } else if (currE.condition == EXPRESSION_CONDITION.LIKEIN) {
        temp[currE.name] = {
          $regex: `${currE.values.replaceAll("|", "").replaceAll("?", "|")}`,
          $options: "i",
        };
      }
      o[o.length - 1].push(temp);
    } else if (currE.map) {
      // If current expression is a condition
      if (currE.map == "OR") {
        e = [...e, { divider: "$or" }, ...currE.expressions.reverse()];
      } else {
        e = [...e, { divider: "$and" }, ...currE.expressions.reverse()];
      }

      currE.expressions.length <= 0 ? o.push([{}]) : o.push([]);
    } else {
      const currO = o.pop();
      let temp = {};
      temp[currE.divider] = currO;
      o[o.length - 1].push(temp);
    }
  }

  return o.pop()[0];
};

const ExpressionActionsComp = ({
  isAdd = false,
  isAddG = false,
  isRemove = true,
  bind = undefined,
  path = "",
  names,
  handleSetSource,
  ...rest
}) => {
  const { token } = useToken();
  return (
    <Space size={1}>
      {/* <Tooltip title="Move up">
        <UpSquareFilled style={{ color: token.colorTextSecondary }} />
      </Tooltip>
      <Tooltip title="Move down">
        <DownSquareFilled style={{ color: token.colorTextSecondary }} />
      </Tooltip> */}
      {isRemove && (
        <Tooltip title="Remove condition">
          <MinusCircleFilled
            style={{ color: token.colorError }}
            onClick={() => {
              let { parents, o, indx } = handlePath(
                bind,
                isAdd ? path.substring(0, path.length - 12) : path
              );
              parents != undefined && parents.splice(indx, 1);
              handleSetSource({ ...bind });
            }}
          />
        </Tooltip>
      )}
      {isAdd && (
        <Tooltip title="Add condition">
          <PlusCircleFilled
            style={{ color: token.colorPrimaryBgHover }}
            onClick={() => {
              let { o } = handlePath(bind, path);
              o.push({
                name: names[0].name,
                condition: EXPRESSION_CONDITION.EQ,
                values: "",
              });
              handleSetSource({ ...bind });
            }}
          />
        </Tooltip>
      )}
      {isAddG && (
        <Tooltip title="Add group condition">
          <DiffFilled
            style={{ color: token.colorPrimaryBgHover }}
            onClick={() => {
              let { o } = handlePath(bind, path);
              o.push({
                map: "AND",
                expressions: [],
              });
              handleSetSource({ ...bind });
            }}
          />
        </Tooltip>
      )}
    </Space>
  );
};

const FilterExpressionComp = ({ names, source, handleSetSource, ...rest }) => {
  const level = rest.level ?? -1;
  let path = rest.path ?? "expressions";
  if (rest.path) {
    path += source.map ? "¶expressions" : "";
  }

  if (source.name) {
    return (
      <Space size={3}>
        {/* <Badge count={"&"} color="#faad14" /> */}
        {/* {level > 0 ? (
          <span style={{ color: token.colorTextSecondary, fontSize: "0.5em" }}>{level}</span>
        ) : (
          ""
        )} */}
        <Select
          size="small"
          value={source.name.isEmpty() ? names[0].name : source.name.trim()}
          style={{ width: 120 }}
          options={names.map((e) => {
            return {
              value: e.name,
              label: e.name,
            };
          })}
          onChange={(v, e) => {
            source.name = e.value;
            handleSetSource({ ...rest.srcState });
          }}
        />
        <Select
          size="small"
          value={source.condition ?? EXPRESSION_CONDITION.EQ}
          style={{ width: 69 }}
          options={Object.entries(EXPRESSION_CONDITION).map(([key, val], i) => {
            return {
              value: val,
              label: val,
            };
          })}
          onChange={(v, e) => {
            source.condition = e.value;
            handleSetSource({ ...rest.srcState });
          }}
        />
        <Input
          value={source?.values.trim()}
          style={{ width: "90px" }}
          onChange={(e) => {
            source.values = e.currentTarget.value;
            handleSetSource({ ...rest.srcState });
          }}
        />
        <ExpressionActionsComp
          path={path}
          bind={rest.srcState}
          names={names}
          handleSetSource={handleSetSource}
        />
      </Space>
    );
  }

  return (
    <Content
      className="content"
      style={{
        borderRadius: "5px",
        borderLeft: "1px solid rgba(9, 30, 66, 0.1)",
        // background: "white",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <Space size={3}>
        {/* {level + 1 > 0 ? (
          <span style={{ color: token.colorTextSecondary, fontSize: "0.5em" }}>{level + 1}</span>
        ) : (
          ""
        )} */}
        <Select
          size="small"
          value={source.map == "AND" ? "AND" : "OR"}
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
          onChange={(v, e) => {
            source.map = e.value;
            handleSetSource({ ...rest.srcState });
          }}
        />
        {source.map == "AND"
          ? "All of the following are true"
          : "Any of the following are true"}
        <ExpressionActionsComp
          isAdd={true}
          isAddG={true}
          isRemove={level >= 0}
          path={path}
          names={names}
          handleSetSource={handleSetSource}
          bind={rest.srcState ?? source}
        />
      </Space>
      <div />

      {source.expressions.map((e, i) => {
        return (
          <React.Fragment key={`FormExpressionComp_${i}`}>
            <FilterExpressionComp
              names={names}
              source={e}
              handleSetSource={handleSetSource}
              level={level + 1}
              srcState={rest.srcState ?? source}
              path={`${path}¶${i}`}
            />
            <div />
          </React.Fragment>
        );
      })}
    </Content>
  );
};

export { FilterExpressionComp, handleParseExpression };
