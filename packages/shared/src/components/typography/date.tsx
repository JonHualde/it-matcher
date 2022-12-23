import { getDate } from "@shared-utils";

interface DateProps {
  children: string | Date;
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
}

const Date = (props: DateProps) => {
  let customClassName: string = "text-sm md:text-base";

  const getColor = (): string => {
    switch (props.color) {
      case "blue-dimmed":
        return " text-blue-dimmed";
      case "blue-ocean":
        return " text-blue-ocean";
      case "blue-purple":
        return " text-blue-purple";
      default:
        return " text-black";
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

  return <p className={generateClassName()}>{getDate(props.children)}</p>;
};

export default Date;
