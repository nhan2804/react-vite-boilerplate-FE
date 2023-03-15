import { CaretDownOutlined } from "@ant-design/icons";
import { Select, Space, Input } from "antd";
import { useRef } from "react";
import { PopoverComp, MetaComp } from "./CommonComp";

const PaginationComp = ({
  children,
  total,
  source,
  handleSetSource,
  ...rest
}) => {
  const perPageRef = useRef();
  const localPerPage = localStorage.getItem("perPage") ?? 20;
  const totalPages = Math.ceil(total / localPerPage);
  const page = source?.page ?? 1;
  return (
    <div>
      <PopoverComp
        content={
          <Space>
            Show
            <Input
              ref={perPageRef}
              defaultValue={localPerPage}
              onBlur={(e) => {
                localStorage.setItem("perPage", e.currentTarget.value);
                handleSetSource({ perPage: e.currentTarget.value, page: 1 });
              }}
              style={{ width: 50 }}
            />
            /page
          </Space>
        }
      >
        <CaretDownOutlined /> Page:
      </PopoverComp>{" "}
      <Select
        showSearch
        value={page}
        bordered={true}
        optionFilterProp="children"
        // onChange={onChange}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={Array.from(Array(totalPages)).map((e, i) => {
          return {
            value: i + 1,
            label: i + 1 + "/" + totalPages,
          };
        })}
        onChange={(v, e) => {
          handleSetSource({
            page: v,
            perPage: perPageRef.current
              ? perPageRef.current.input.value
              : localPerPage,
          });
        }}
        size="small"
        // style={{ width: 60 }}
      />{" "}
      <MetaComp
        desc={
          parseInt((page - 1) * localPerPage) +
          1 +
          "~" +
          (parseInt((page - 1) * localPerPage) + parseInt(localPerPage)) +
          "/" +
          total
        }
      />
    </div>
  );
};

export default PaginationComp;
