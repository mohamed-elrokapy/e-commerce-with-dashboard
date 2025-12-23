import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const icons = {
  success: <CheckCircleIcon className="w-5 h-5 mr-2" />,
  error: <ExclamationCircleIcon className="w-5 h-5 mr-2" />,
  info: <InformationCircleIcon className="w-5 h-5 mr-2" />,
  warning: <ExclamationTriangleIcon className="w-5 h-5 mr-2" />,
};

const bgColors = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500 text-black",
};

export default function Toast({ message, show, onClose, type = "info" }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform
        ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        ${
          bgColors[type]
        } text-white px-4 py-2 rounded-xl shadow-lg flex items-center`}>
      {icons[type]}
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-200">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
}
