import { ReactElement } from "react";

interface TitleProps {
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
  children: string | ReactElement;
}

const Paragraph = (props: TitleProps) => {
  let customClassName: string = "";

  const generateClassName = (): string => {
    if (props.color) {
      customClassName += ` text-${props.color}`;
    }

    if (props.customClassName) {
      customClassName += ` ${props.customClassName}`;
    }

    return customClassName;
  };

  return <p className={generateClassName()}>{props.children}</p>;
};

export default Paragraph;
