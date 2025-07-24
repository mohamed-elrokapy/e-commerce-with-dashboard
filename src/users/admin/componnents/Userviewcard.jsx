import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import appcontext from "../../context/appcontext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Userviewcard = () => {
  const navigate = useNavigate();
  const { targeteduser } = useContext(appcontext);

  if (!targeteduser) {
    return (
      <div className="flex justify-center mt-5">
        <Typography variant="h4" color="red" className="text-center">
          No user data available
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Card className="my-6 w-100 bg-[#000000b6] gap-5">
        <CardBody className="flex flex-col gap-8">
          <Typography
            variant="h3"
            color="white"
            className="mb-2 text-center text-[1.5em]">
            User Information
          </Typography>
          <hr />
          <div className="text-white text-[1.2em]">
            <h4>Username: {targeteduser.fullname}</h4>
            <h4>Email: {targeteduser.email}</h4>
            <h4>Password: {targeteduser.password}</h4>
            <h4>Role: {targeteduser.role}</h4>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            size="lg"
            className="w-full">
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Userviewcard;
