import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

import { IoHome } from "react-icons/io5";

export function Adminheader() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-3xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            as="span"
            variant="h6"
            className="mr-4 ml-2  py-1.5 text-2xl font-bold">
            Admin Panel
          </Typography>
          <div className="ml-auto flex gap-4 md:mr-4 items-center">
            <Link to={"/"}>
              <IoHome className="mr-3 text-xl" />
            </Link>

            <IconButton variant="text" color="white">
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <IconButton variant="text" color="white">
              <BellIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Search..."
              className="pr-20"
              containerProps={{
                className: "min-w-[300px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded-full bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </Navbar>
      <div className="flex items-center bg-[#00000002] justify-evenly py-4 pr-10 mt-4 rounded-lg shadow-md">
        <Button
          size="md"
          onClick={() => navigate("/admin/dashboard")}
          className="px-6 py-3 text-white hover:bg-blue-600 hover:text-white rounded-lg transition duration-200">
          Dashboard
        </Button>
        <Button
          size="md"
          onClick={() => navigate("/admin/products")}
          className="px-6 py-3 text-white hover:bg-blue-600 hover:text-white rounded-lg transition duration-200">
          Products
        </Button>
        <Button
          size="md"
          onClick={() => navigate("/admin/users")}
          className="px-6 py-3 text-white hover:bg-blue-600 hover:text-white rounded-lg transition duration-200">
          Users
        </Button>
      </div>
    </div>
  );
}
