import React from "react";
import { BellIcon, HomeIcon, MusicNoteIcon } from "@heroicons/react/outline";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import { useAppSelector } from "@hooks/reduxHook";
import useLogout from "@modules/auth/hooks/useLogout";
import { Button, Input, version } from "antd";
const Header = () => {
  const { data: u } = useGetProfile();
  const user = useAppSelector((s) => s?.auth?.user);
  const { mutate: logout } = useLogout();
  // const logout=()=>{

  // }
  return (
    <div className="flex items-center justify-between shadow">
      <div className="text-2xl font-bold">
        <Button type="primary">Report app</Button>
      </div>
      <div className="flex">
        <div className="px-8 py-2 transition-colors rounded hover:bg-gray-200">
          <HomeIcon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-4">
          <div className="p-3">
            <BellIcon className="w-6 h-6" />
          </div>

          <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          {user && (
            <span aria-hidden onClick={logout}>
              {user?.username}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
