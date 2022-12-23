import { ReactElement } from "react";

interface TitleProps {
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
  children: string | ReactElement;
}

const Paragraph = (props: TitleProps) => {
  let customClassName: string = "";

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

  return <p className={generateClassName()}>{props.children}</p>;
};

export default Paragraph;
