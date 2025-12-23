import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import appcontext from "../../../context/appcontext";

export function Shopingcartsummary({ total }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(appcontext);

  const alltopay = {
    taxes: ".5",
    shipping: "3.5",
  };

  // Check if the cart is empty
  if (total === 0) {
    return (
      <Card className="mt-6 w-96 mx-auto">
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Your shopping cart is empty
          </Typography>
          <Typography className="mb-4">
            There are no products in your cart. Please add products to proceed.
          </Typography>
          <Button className="w-full" onClick={() => navigate("/shop")}>
            Browse Products
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="mt-6 w-96 mx-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
          Cart Summary
        </Typography>
        <div className="mb-2">
          <Typography className="flex justify-between">
            <span>Subtotal</span>
            <span>$ {total}</span>
          </Typography>
          <Typography className="flex justify-between">
            <span>Taxes</span>
            <span>$ {alltopay.taxes}</span>
          </Typography>
          <Typography className="flex justify-between">
            <span>Shipping</span>
            <span>$ {alltopay.shipping}</span>
          </Typography>
        </div>
        <hr />
        <Typography className="flex justify-between my-1 font-semibold text-lg">
          <span>Total</span>
          <span>
            ${(+total + +alltopay.shipping + +alltopay.taxes).toFixed(2)}
          </span>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          className="w-full"
          onClick={() => {
            if (isLoggedIn) {
              navigate("/checkout");
            } else {
              navigate("/login");
            }
          }}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
