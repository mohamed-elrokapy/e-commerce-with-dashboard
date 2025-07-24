import React, { useContext, useState, useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import appcontext from "../../context/appcontext";
import AvatarWithUserDropdown from "./AvatarWithUserDropdown";
import axios from "axios";

const navListMenuItems = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "Contact Us", path: "/contactus" },
];

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-white">
      {navListMenuItems.map((item) => (
        <Typography
          as="div"
          variant="small"
          className="font-medium"
          key={item.title}>
          <Link to={item.path}>
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              {item.title}
            </ListItem>
          </Link>
        </Typography>
      ))}
    </List>
  );
}

export function Header() {
  const [openNav, setOpenNav] = useState(false);
  const { isloggedin, setlogeduserinfo, shoppinglist } = useContext(appcontext);

  const [dark_light] = useState(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const [theme, settheme] = useState(false);
  // dark/light colors not finished yet
  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    settheme(true);
  }

  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    settheme(false);
  }

  const request = (id) => {
    const FIREBASE_URL = import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;

    if (isloggedin) {
      axios({
        method: "get",
        url: `${FIREBASE_URL}/users/${id}.json`,
      })
        .then((response) => {
          setlogeduserinfo(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  };

  useEffect(() => {
    if (isloggedin) {
      request(localStorage.postuserid);
    }
  }, [isloggedin]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="fixed z-10 bg-[#00000002] max-w-full px-4 py-2  dark:bg-gray-900">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center">
          <Typography as="span" variant="h6" className="mr-4 py-1.5 lg:ml-2">
            Elrokapy Store
          </Typography>
          {theme ? (
            <button onClick={() => setLightTheme()}>
              <MdDarkMode />
            </button>
          ) : (
            <button onClick={() => setDarkTheme()}>
              <MdOutlineDarkMode />
            </button>
          )}
        </div>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="hidden gap-2 lg:flex items-center">
          <Link to={"/shopingcartpage"}>
            <div className="relative">
              <FaCartArrowDown className="text-[1.5em] text-black dark:text-white" />
              <span className="text-black absolute -top-3 left-4">
                {shoppinglist?.length > 0 && shoppinglist.length}
              </span>
            </div>
          </Link>
          {isloggedin ? (
            <AvatarWithUserDropdown />
          ) : (
            <div>
              <Link to={"/login"}>
                <Button variant="text" size="sm" color="white">
                  Log In
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button variant="gradient" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />

        <div className="flex items-center gap-6">
          {isloggedin ? (
            <AvatarWithUserDropdown />
          ) : (
            <div className="flex w-full flex-nowrap items-center gap-5 lg:hidden">
              <Link to={"/login"}>
                <Button variant="outlined" size="sm" color="green">
                  Log In
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button variant="gradient" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          <Link to={"/shopingcartpage"}>
            <div className="relative">
              <span className="text-green-900 text-[1.2em] font-extrabold  absolute -top-7 left-3">
                {shoppinglist?.length > 0 && shoppinglist.length}
              </span>
              <FaCartArrowDown className="w-fit text-[1.5em]" />
            </div>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
