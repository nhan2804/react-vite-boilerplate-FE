import {
  SearchOutlined,
  DownloadOutlined,
  PoweroffOutlined,
  SettingOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  Typography,
  theme,
  Table,
  Row,
  Space,
  Button,
  Breadcrumb,
  Collapse,
  Popover,
  Segmented,
  Tag,
  Popconfirm,
  Skeleton,
  Spin,
  Select,
  Progress,
  Divider,
} from "antd";
import { useState } from "react";
import { ColBlockComp, MetaComp, PopoverComp } from "../CommonComp";
import { DataProviderComp } from "../DataProviderComp";
import { FilterExpressionComp } from "../FilterExpressionComp";
import PaginationComp from "../PaginationComp";
import { SortExpressionComp } from "../SortExpressionComp";

const { Text } = Typography;
const { Panel } = Collapse;
const { useToken } = theme;

const TableBrandListComp = ({ children, ...rest }) => {
  const { token } = useToken();
  let brandColors = [],
    tagColors = [];
  Object.keys(token).forEach((k) => {
    if (k.includes("color")) {
      brandColors.push({
        alias: k,
        color: token[k],
        view: token[k],
      });
    }

    if (
      k.includes("blue") ||
      k.includes("cyan") ||
      k.includes("lime") ||
      k.includes("green") ||
      k.includes("red") ||
      k.includes("volcano") ||
      k.includes("orange") ||
      k.includes("gold") ||
      k.includes("purple") ||
      k.includes("magenta")
    ) {
      tagColors.push({
        alias: k,
        color: token[k],
        view: token[k],
      });
    }
  });

  brandColors.sort((a, b) => (a.alias > b.alias ? -1 : 1));
  tagColors.sort((a, b) => (a.alias > b.alias ? -1 : 1));

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <div>
        <b>license:</b> <a href="https://ant.design/theme-editor">Ant Design</a>{" "}
        |{" "}
        <Button size="small" type="primary">
          <span role="img" aria-label="d">
            ✍ Edit new style
          </span>
        </Button>{" "}
        |{" "}
        <Select
          size="small"
          defaultValue={"brand1"}
          // style={{ width: 69 }}
          options={[
            {
              value: "brand1",
              label: "Color brand 1",
            },
            {
              value: "brand2",
              label: "Color brand 2",
            },
            {
              value: "brand3",
              label: "Color brand 3",
            },
          ]}
        />
      </div>
      <Space align="start">
        <Table
          size="small"
          pagination={false}
          showHeader={true}
          bordered="true"
          rowKey="alias"
          // style={{ width: 400, margin: "0 auto" }}
          dataSource={brandColors}
          columns={[
            {
              title: "alias",
              dataIndex: "alias",
              render: (value) => (
                <>
                  <b>.{value}</b>
                </>
              ),
            },
            {
              title: "color",
              dataIndex: "color",
            },
            {
              title: "view",
              dataIndex: "view",
              render: (color) => (
                <div
                  style={{ color: color, background: color, height: "100%" }}
                >
                  !
                </div>
              ),
            },
          ]}
        />

        <Table
          size="small"
          pagination={false}
          showHeader={true}
          bordered="true"
          rowKey="alias"
          // rowKey={(record) => record.index}
          // style={{ width: 400, margin: "0 auto" }}
          dataSource={tagColors}
          columns={[
            {
              title: "alias",
              dataIndex: "alias",
              render: (value) => (
                <>
                  <b>.{value}</b>
                </>
              ),
            },
            {
              title: "color",
              dataIndex: "color",
            },
            {
              title: "view",
              dataIndex: "view",
              render: (color) => (
                <div
                  style={{ color: color, background: color, height: "100%" }}
                >
                  !
                </div>
              ),
            },
          ]}
        />
        <table>
          <tbody>
            <tr>
              <td valign="top">ColBlockComp</td>
              <td>
                <ColBlockComp />
              </td>
            </tr>
            <tr>
              <td valign="top">PopoverComp</td>
              <td>
                <PopoverComp content={<Progress type="circle" percent={75} />}>
                  <Button size="small">Click me</Button>
                </PopoverComp>
              </td>
            </tr>
            <tr>
              <td valign="top">MetaComp</td>
              <td>
                <MetaComp title={"Title"} desc={"Desc"} />
              </td>
            </tr>
            <tr>
              <td valign="top">DataProviderComp</td>
              <td>
                <DataProviderComp provider={{ isFetching: true }} /> Fetching
                data ...
              </td>
            </tr>
            <tr>
              <td valign="top">FilterExpressionComp</td>
              <td>
                <FilterExpressionComp
                  names={["name", "title"]}
                  source={{ map: "AND", expressions: [] }}
                />
              </td>
            </tr>
            <tr>
              <td valign="top">SortExpressionComp</td>
              <td>
                <SortExpressionComp
                  names={["name", "title"]}
                  source={[{ name: "name", sort: "ASC" }]}
                />
              </td>
            </tr>
            <tr>
              <td valign="top">PaginationComp</td>
              <td>
                <PaginationComp
                  total={5}
                  source={{
                    perPage: localStorage.getItem("perPage") ?? 20,
                    page: 1,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td valign="top">FormComp</td>
              <td>[Auto genarate model update/delete form]</td>
            </tr>
            <tr>
              <td valign="middle" colSpan={2} style={{ height: "50px" }}>
                <Divider>
                  <b>Divider</b>
                </Divider>
              </td>
            </tr>
            <tr>
              <td valign="top">Button</td>
              <td>
                <Space wrap>
                  <Button size="small" type="primary">
                    Primary Button
                  </Button>
                  <Button size="small">Default Button</Button>
                  <Button size="small" type="dashed">
                    Dashed Button
                  </Button>
                  <Button size="small" type="text">
                    Text Button
                  </Button>
                  <Button size="small" type="link">
                    Link Button
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                  ></Button>
                  <Button
                    size="small"
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                  >
                    Download
                  </Button>
                  <Button size="small" disabled>
                    disabled
                  </Button>
                  <Button size="small" danger>
                    Danger
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    icon={<PoweroffOutlined />}
                    loading={true}
                  >
                    Loading
                  </Button>
                </Space>
              </td>
            </tr>
            <tr>
              <td valign="top">Typography</td>
              <td>
                <Space wrap>
                  <Text>Ant Design (default)</Text>
                  <Text type="secondary">Ant Design (secondary)</Text>
                  <Text type="success">Ant Design (success)</Text>
                  <Text type="warning">Ant Design (warning)</Text>
                  <Text type="danger">Ant Design (danger)</Text>
                  <Text disabled>Ant Design (disabled)</Text>
                  <Text mark>Ant Design (mark)</Text>
                  <Text code>Ant Design (code)</Text>
                  <Text keyboard>Ant Design (keyboard)</Text>
                  <Text underline>Ant Design (underline)</Text>
                  <Text delete>Ant Design (delete)</Text>
                  <Text strong>Ant Design (strong)</Text>
                  <Text italic>Ant Design (italic)</Text>
                </Space>
              </td>
            </tr>
            <tr>
              <td valign="top">Breadcrumb</td>
              <td>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="s">Home</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="s">Application Center</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="s">Application List</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </td>
            </tr>
            <tr>
              <td valign="top">Collapse</td>
              <td>
                <Collapse defaultActiveKey={["1"]} expandIconPosition="start">
                  <Panel
                    header="This is panel header 1"
                    key="1"
                    extra={<SettingOutlined />}
                  >
                    <div>This is panel body 1</div>
                  </Panel>
                  <Panel
                    header="This is panel header 2"
                    key="2"
                    extra={<SettingOutlined />}
                  >
                    <div>This is panel body 2</div>
                  </Panel>
                  <Panel
                    header="This is panel header 3"
                    key="3"
                    extra={<SettingOutlined />}
                  >
                    <div>This is panel body 3</div>
                  </Panel>
                </Collapse>
              </td>
            </tr>
            <tr>
              <td valign="top">Popover</td>
              <td>
                <Popover
                  content={
                    <a href="d" aria-hidden onClick={hide}>
                      Close
                    </a>
                  }
                  title="Title"
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button size="small" type="primary">
                    Click me
                  </Button>
                </Popover>
              </td>
            </tr>
            <tr>
              <td valign="top">Segmented</td>
              <td>
                <Segmented
                  size="small"
                  options={[
                    {
                      label: "List",
                      value: "List",
                      icon: <BarsOutlined />,
                    },
                    {
                      label: "Kanban",
                      value: "Kanban",
                      icon: <AppstoreOutlined />,
                    },
                  ]}
                />
              </td>
            </tr>
            <tr>
              <td valign="top">Tag</td>
              <td>
                <Tag color="#f50">#f50</Tag>
                <Tag color="#2db7f5">#2db7f5</Tag>
                <Tag color="#87d068">#87d068</Tag>
                <Tag color="#108ee9">#108ee9</Tag>
              </td>
            </tr>
            <tr>
              <td valign="top">Skeleton</td>
              <td>
                <Skeleton active />
              </td>
            </tr>
            <tr>
              <td valign="top">Popconfirm</td>
              <td>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  // onConfirm={confirm}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="d">Delete</a>
                </Popconfirm>
              </td>
            </tr>
            <tr>
              <td valign="top">Spin</td>
              <td>
                <Spin />
              </td>
            </tr>
          </tbody>
        </table>
      </Space>
    </>
  );
};

export default TableBrandListComp;
