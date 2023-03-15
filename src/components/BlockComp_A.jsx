/* eslint-disable jsx-a11y/accessible-emoji */
import { UsergroupAddOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Col,
  Row,
  Space,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import { ColBlockComp, MetaComp } from "./base/CommonComp";

const { Text } = Typography;
const { useToken } = theme;

/* Create one block with background & border in Col of antd
  |***************|
  |               |
  |_______________|
*/
const ColBlockCompA = ({ children, title, desc, ...rest }) => {
  const { token } = useToken();
  const colors = ["#3b5999", "error", "success", "#3b5999"];
  return (
    <ColBlockComp>
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: "6px",
          width: "calc(100% - 12px)",
          height: "70%",
          borderRadius: "2px 2px 0 0",
          backgroundColor: token.colorWarningActive,
          backgroundImage: `url('${rest.bgcover}')`,
          backgroundSize: "cover",
          // backgroundSize: "auto 75%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {" "}
      </div>
      <div style={{ height: 10 }}></div>
      <Row onClick={rest.onClick}>
        <Col style={{ marginRight: "10px" }}>
          <Badge
            dot={true}
            color={
              rest.share == "Private"
                ? "red"
                : rest.share == "Public"
                ? "white"
                : "green"
            }
          >
            <AvatarCompA
              src={rest.avatar}
              icon={rest.icon}
              style={{ border: "1px solid white" }}
            />
          </Badge>
        </Col>
        <Col xs={17} sm={15}>
          <MetaComp title={title} desc={desc} {...rest} />
          <Space size={0} wrap="true">
            {rest.props?.pins?.split(",").map((e, i) => {
              if (e == "MEMBERS") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    2/10 👤
                  </Tag>
                );
              } else if (e == "TASKS") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    15 📝
                  </Tag>
                );
              } else if (e == "ISSUES") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    250 ⚠
                  </Tag>
                );
              } else if (e == "BUGS") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    50 🚫
                  </Tag>
                );
              } else if (e == "RATES") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    50 ⭐
                  </Tag>
                );
              } else if (e == "REMAIN") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    50 🕑
                  </Tag>
                );
              } else if (e == "LIKES") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    50 👍
                  </Tag>
                );
              } else if (e == "DISKLIKES") {
                return (
                  <Tag key={i} color={colors[i]} className="tagA shadow">
                    50 👎
                  </Tag>
                );
              }
            })}
          </Space>
          <Row
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "-5px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Col>
              <Space size={3} align="end">
                {rest.partner?.map((e, i) => (
                  <Tooltip key={i} title={e.description}>
                    <img alt="" height={18} src={e.logo} />
                  </Tooltip>
                ))}
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{
          position: "absolute",
          bottom: "1px",
          left: "0px",
          width: "calc(100% - 12px)",
          fontSize: "0.6em",
          textAlign: "center",
        }}
      >
        {rest.owner ? (
          <>
            <a href="d">{rest.owner}</a> |{" "}
          </>
        ) : (
          ""
        )}
        {rest.createdAt ? <>©{moment(rest.createdAt).format("YYYY/MM")}</> : ""}
      </div>
    </ColBlockComp>
  );
};

export const AvatarCompA = ({ children, src, icon, ...rest }) => {
  return (
    <Avatar
      shape="square"
      style={rest.style}
      size={{
        xs: 64,
        sm: 70,
        md: 70,
        lg: 70,
        xl: 64,
        xxl: 64,
      }}
      src={src}
      icon={icon}
    />
  );
};

export default ColBlockCompA;
