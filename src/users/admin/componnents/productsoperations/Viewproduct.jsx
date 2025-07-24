import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import appcontext from "../../../context/appcontext";
import { useNavigate } from "react-router-dom";

export default function Viewproduct() {
  const { targetedproduct } = useContext(appcontext);
  const navigate = useNavigate();

  function backward() {
    navigate(-1);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-gray-300">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={targetedproduct?.img}
            alt="card-image"
            className="h-full w-full object-cover rounded-t-xl"
          />
        </CardHeader>
        <CardBody className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="text-lg font-semibold">
              {targetedproduct?.title}
            </Typography>
            <Typography color="blue-gray" className="text-lg font-semibold">
              ${targetedproduct?.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 text-sm">
            {targetedproduct?.productDescription}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 pb-4 px-6">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={backward}
            className="bg-blue-500 text-white shadow-md hover:shadow-lg hover:bg-blue-600 focus:shadow-none focus:ring-2 focus:ring-blue-500">
            BACK
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
