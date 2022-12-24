import { ReactElement } from "react";

interface BadgeProps {
  color?: "green" | "red" | "yellow" | "blue" | "gray";
  customClassName?: string;
  children: string | ReactElement;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  icon?: ReactElement;
}

const Badge = (props: BadgeProps) => {
  let customClassName: string = `px-3 py-1 rounded-${props.rounded || "md"}`;

  const getColor = (): string => {
    switch (props.color) {
      case "green":
        return " bg-green-100 text-green-800";
      case "red":
        return " bg-red-100 text-red-800";
      case "yellow":
        return " bg-yellow-100 text-yellow-800";
      case "blue":
        return " bg-blue-100 text-blue-800";
      case "gray":
        return " bg-gray-100 text-gray-800";
      default:
        return " bg-gray-100 text-gray-800";
    }
  };

  const generateClassName = (): string => {
    if (props.color) {
      customClassName += getColor();
    }

    if (props.customClassName) {
      customClassName += ` ${props.customClassName}`;
    }

    return customClassName;
  };

  return (
    <div className={generateClassName()}>
      {props.children}
      {props.icon && props.icon}
    </div>
  );
};

export default Badge;
