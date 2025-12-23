import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import appcontext from "../../context/appcontext";
import Toast from "./Toast";

export default function Productcard({ product }) {
  const { setaddtocartcount, shoppinglist, setshoppinglist } =
    useContext(appcontext);

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  function handleaddtocart(id) {
    const isexist = shoppinglist?.some((item) => item.id == id);
    if (!isexist) {
      setshoppinglist([...shoppinglist, product]);
      setToastType("success");
      setShowToast(true);
    } else {
      setToastType("warning");
      setShowToast(true);
    }
  }


  useEffect(() => {
    setaddtocartcount(shoppinglist?.length);
  }, [shoppinglist]);

  return (
    <>
      <Card className="w-[90%] md:w-[45%] lg:w-[30%]">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={product?.img}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography as={"span"} color="blue-gray" className="font-medium">
              {product?.title || "product title"}
            </Typography>
            <Typography as={"span"} color="blue-gray" className="font-medium">
              ${product?.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75">
            {product?.productDescription || "product description"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={() => handleaddtocart(product.id)}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* Toast */}
      <Toast
        message={
          toastType === "success"
            ? "Product added to cart!"
            : "Product already in cart!"
        }
        show={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
    </>
  );
}
