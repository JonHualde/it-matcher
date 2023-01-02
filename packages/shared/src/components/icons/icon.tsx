import { IoClose } from "react-icons/io5";
import { BsCheck2 } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { FiInfo } from "react-icons/fi";

interface IconProps {
  type: "success" | "error" | "info" | "warning";
  size?: "tiny" | "small" | "medium" | "large";
}

const Icon = (props: IconProps) => {
  const getSize = () => {
    switch (props?.size) {
      case "tiny":
        return 10;
      case "small":
        return 20;
      case "medium":
        return 30;
      case "large":
        return 40;
      default:
        return 20;
    }
  };

  const generateIcon = () => {
    switch (props.type) {
      case "success":
        return (
          <div className="flex items-center justify-center rounded-full bg-green-300 p-2.5">
            <BsCheck2 className="text-green-700" size={getSize()} />
          </div>
        );
      case "error":
        return (
          <div className="flex items-center justify-center rounded-full bg-red-300 p-2.5">
            <IoClose className="text-red-700" size={getSize()} />
          </div>
        );
      case "info":
        return (
          <div className="flex items-center justify-center rounded-full bg-blue-300 p-2">
            <FiInfo className="text-blue-700" size={getSize()} />
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center justify-center rounded-full bg-yellow-300 p-2.5">
            <CiWarning className="text-yellow-700" size={getSize()} />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center rounded-full bg-green-300 p-2.5">
            <BsCheck2 className="text-green-700" size={getSize()} />
          </div>
        );
    }
  };

  return generateIcon();
};

export default Icon;
