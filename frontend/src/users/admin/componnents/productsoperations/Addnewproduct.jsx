import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext, useState } from "react";
import appcontext from "../../../context/appcontext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export default function Addnewproduct() {
  const FIREBASE_URL = import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;
  const [updatedproduct, setupdatedproduct] = useState({
    id: uuidv4(),
    price: "",
    title: "",
    productDescription: "",
    img: "",
    count: "",
  });

  const [error, seterror] = useState({});

  const { refresh, setrefresh } = useContext(appcontext);

  const navigate = useNavigate();

  const validation = () => {
    const allerrors = {};

    if (updatedproduct.price === "") {
      allerrors.priceerror = "Field is required!";
    } else if (isNaN(+updatedproduct.price)) {
      allerrors.priceerror = "Price must be a number!";
    }

    if (updatedproduct.count == "") {
      allerrors.counterror = "Field is required!";
    } else if (isNaN(+updatedproduct.count)) {
      allerrors.counterror = "Count must be a number!";
    }

    if (updatedproduct.title === "") {
      allerrors.titleerror = "Field is required!";
    } else if (!isNaN(+updatedproduct.title)) {
      allerrors.titleerror = "Title cannot be a number!";
    }

    if (updatedproduct.productDescription === "") {
      allerrors.productDescriptionerror = "Field is required!";
    } else if (!isNaN(+updatedproduct.productDescription)) {
      allerrors.productDescriptionerror = "Description must contain letters!";
    }

    if (updatedproduct.img === "") {
      allerrors.imgerror = "Field is required!";
    } else if (!isNaN(+updatedproduct.img)) {
      allerrors.imgerror = "Please add a valid URL!";
    }

    seterror(allerrors);

    return Object.keys(allerrors).length === 0;
  };

  function handlingform(e) {
    e.preventDefault();
    if (validation()) {
      const confirmationfir = Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            const request = await axios({
              method: "post",
              url: `${FIREBASE_URL}/products.json`,
              data: updatedproduct,
            });

            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Product added successfully.",
              confirmButtonColor: "#3085d6",
            });

            setrefresh(!refresh);
            navigate("/admin/products");
          } catch (error) {
            console.log("Error due to server problem", error);
          }
        }
      });
    }
  }

  return (
    <form
      onSubmit={handlingform}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border border-gray-300">
        <CardBody className="p-8">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-6 text-center text-2xl font-semibold">
            Add New Product
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                value={updatedproduct.title || ""}
                onChange={(e) =>
                  setupdatedproduct({
                    ...updatedproduct,
                    title: e.target.value,
                  })
                }
                label={error.titleerror || "Product title"}
                color={error.titleerror ? "red" : "blue"}
              />
            </div>
            <Input
              value={updatedproduct.count || ""}
              onChange={(e) =>
                setupdatedproduct({ ...updatedproduct, count: e.target.value })
              }
              label={error.counterror || "Count"}
              color={error.counterror ? "red" : "blue"}
              type="number"
            />
            <Input
              value={updatedproduct.price || ""}
              onChange={(e) =>
                setupdatedproduct({ ...updatedproduct, price: e.target.value })
              }
              label={error.priceerror || "Price"}
              color={error.priceerror ? "red" : "blue"}
              type="number"
            />
            <Input
              type="text"
              value={updatedproduct.img || ""}
              onChange={(e) =>
                setupdatedproduct({ ...updatedproduct, img: e.target.value })
              }
              label={error.imgerror || "Image URL"}
              color={error.imgerror ? "red" : "blue"}
            />
            <Textarea
              value={updatedproduct.productDescription || ""}
              onChange={(e) =>
                setupdatedproduct({
                  ...updatedproduct,
                  productDescription: e.target.value,
                })
              }
              label={error.productDescriptionerror || "Description"}
              color={error.productDescriptionerror ? "red" : "blue"}
              className="h-auto"
              resize={true}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              color="blue-gray"
              className="rounded-full px-6 py-2 shadow-md hover:shadow-lg">
              Back
            </Button>
            <Button
              type="submit"
              color="blue"
              className="rounded-full px-6 py-2 shadow-md hover:shadow-lg">
              Confirm
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
