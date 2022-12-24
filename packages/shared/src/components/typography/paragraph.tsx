import { ReactElement } from "react";

interface TitleProps {
  customClassName?: string;
  children: string | ReactElement;
  size?: "tiny" | "small" | "medium" | "large";
  ref?: any;
}

const Paragraph = (props: TitleProps) => {
  const getParagraphSize = (): string => {
    switch (props.size) {
      case "tiny":
        return " text-xs md:text-sm ";
      case "small":
        return " text-sm md:text-base ";
      case "medium":
        return " text-md md:text-lg";
      case "large":
        return " text-lg md:text-xl";
      default:
        return " text-md md:text-lg";
    }
  };

  return <p className={`${props.customClassName ?? ""} ${getParagraphSize()}`}>{props.children}</p>;
};

export default Paragraph;
