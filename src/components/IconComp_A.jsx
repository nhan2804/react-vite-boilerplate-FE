import { theme, Tooltip } from "antd";
import React from "react";

const { useToken } = theme;

const IconCompA = ({ children, icon, size = 10, varian = "none", ...rest }) => {
  const { token } = useToken();
  return (
    <Tooltip title={rest.title}>
      {React.cloneElement(icon, {
        style: {
          fontSize: size,
          border: "2px solid read",
          color: rest.style?.color ?? token.colorTextSecondary,
        },
        ...rest,
      })}
    </Tooltip>
  );
};

export default IconCompA;
