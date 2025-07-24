import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Dashboardcard({
  title,
  count,
  numberlabel,
  lastaded,
  lastaddedlabel,
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="transition-transform duration-300">
      <Card className="mt-6 w-80 md:w-96 bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] shadow-lg shadow-indigo-500/30 border border-gray-700">
        <CardBody className="flex flex-col gap-6">
          <Typography
            variant="h3"
            color="white"
            className="text-center uppercase tracking-wider">
            {title}
          </Typography>

          <div className="text-white space-y-4">
            <div>
              <Typography className="text-gray-400 text-sm mb-1">
                {numberlabel}
              </Typography>
              <div className="bg-gray-800 px-4 py-2 rounded-lg text-lg font-semibold">
                {count}
              </div>
            </div>

            <div>
              <Typography className="text-gray-400 text-sm mb-1">
                {lastaddedlabel}
              </Typography>
              <div className="bg-gray-800 px-4 py-2 rounded-lg text-lg font-medium truncate">
                {lastaded || "there is no"}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => {
                title === "users"
                  ? navigate("/admin/users")
                  : navigate("/admin/products");
              }}
              size="lg"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300">
              check out
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
