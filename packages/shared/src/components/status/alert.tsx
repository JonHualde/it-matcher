// Components
import { Icon } from "@shared-components/icons";
import { BsXLg } from "react-icons/bs";

interface AlertProps {
  status: "success" | "error" | "warning" | "info";
  message: string | string[];
  close?: () => void;
}

const Alert = (props: AlertProps) => {
  const getStyle = () => {
    switch (props.status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "error":
        return "bg-red-100 text-red-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className={`relative mb-3 flex h-auto w-full items-center gap-x-4 rounded-md py-3 pl-4 pr-8  ${getStyle()}`}>
      <Icon type={props.status} size="small" />
      {Array.isArray(props.message) ? (
        <ul className="list-disc pl-4">
          {props.message.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <div className="line-clamp-2">{props.message}</div>
      )}
      {props.close && (
        <div className="absolute right-4 cursor-pointer">
          <BsXLg onClick={props.close} />
        </div>
      )}
    </div>
  );
};

export default Alert;
