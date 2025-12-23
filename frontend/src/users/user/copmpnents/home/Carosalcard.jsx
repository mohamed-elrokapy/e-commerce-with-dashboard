import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Carosalcard() {
  const navigate = useNavigate();
  return (
    <Card className="mt-16 w-96 bg-transparent shadow-lg hover:shadow-2xl transition-all duration-300">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          Our products are the best
        </Typography>
        <Typography color="white">
             🍕 "Our food makes the difference – Every
          recipe tells a story!"
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => navigate("/products")}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
          Explore our products
        </Button>
      </CardFooter>
    </Card>
  );
}
