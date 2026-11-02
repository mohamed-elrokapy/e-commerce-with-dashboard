import { Link } from "react-router-dom";
import { STORE_NAME } from "../../lib/config";

export default function Brand({ to = "/", light = false }) {
  return (
    <Link
      to={to}
      className={`font-display text-2xl font-semibold tracking-tight ${light ? "text-paper" : "text-ink"}`}
    >
      {STORE_NAME}
      <span className="text-syrup">.</span>
    </Link>
  );
}
