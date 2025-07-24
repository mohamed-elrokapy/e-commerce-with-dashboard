import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import appcontext from "../../context/appcontext";
import { useNavigate } from "react-router-dom";

export default function AvatarWithUserDropdown() {
  const { setisloggedin, logeduserinfo } = useContext(appcontext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (label) => {
    switch (label) {
      case logeduserinfo?.fullname || "my profile":
        navigate("/userprofile");
        break;
      case "Sign Out":
        localStorage.removeItem("postuserid");
        setisloggedin(false);
        navigate("/login");
        break;
      case "dashbord":
        navigate("/admin");
        break;
      default:
        break;
    }
    closeMenu();
  };

  const profileMenuItems = [
    {
      label: logeduserinfo?.fullname || "my profile",
      icon: UserCircleIcon,
    },
    {
      label: logeduserinfo?.role === "admin" ? "dashbord" : null,
      icon: UserCircleIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ].filter((item) => item.label !== null); // Filter out items with null labels

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0">
          <Avatar
            variant="circular"
            size="md"
            alt={logeduserinfo?.fullname || "User"}
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={key}
              onClick={() => handleMenuItemClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}>
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}>
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
