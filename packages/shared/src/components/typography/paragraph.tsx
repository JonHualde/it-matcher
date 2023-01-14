import { ReactNode } from "react";

interface TitleProps {
  customClassName?: string;
  children: string;
  size?: "tiny" | "small" | "medium" | "large";
  ref?: any;
  click?: () => void;
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

  return (
    <p onClick={props.click} className={`${props.customClassName ?? ""} ${getParagraphSize()}`}>
      {props.children}
    </p>
  );
};

export default Paragraph;
