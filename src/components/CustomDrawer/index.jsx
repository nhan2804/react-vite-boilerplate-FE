import useModal from "@hooks/useModal";
import { Button, Drawer } from "antd";
import React from "react";
import { useImperativeHandle } from "react";

const CustomDrawer = (
  { button, children, title, placement = "right", noButton = false },
  ref
) => {
  const { close, open, toggle, isOpen } = useModal();
  useImperativeHandle(
    ref,
    () => {
      return { close, open, toggle };
    },
    [close, open, toggle]
  );

  return (
    <>
      {!noButton && (
        <>
          {button?.({ open, toggle }) || (
            <Button onClick={open} type="primary">
              Open
            </Button>
          )}
        </>
      )}

      <Drawer
        destroyOnClose={true}
        closable={true}
        title={title || "Tiêu đề"}
        placement={placement}
        onClose={close}
        open={isOpen}
      >
        {children?.({ open, close }) || children}
      </Drawer>
    </>
  );
};

export default React.forwardRef(CustomDrawer);
