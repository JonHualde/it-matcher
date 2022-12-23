import { ReactElement } from "react";

interface TitleProps {
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
  children: string | ReactElement;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title = (props: TitleProps) => {
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

  const generateTag = (): ReactElement => {
    switch (props.type) {
      case "h1":
        return <h1 className={generateClassName()}>{props.children}</h1>;
      case "h2":
        return <h2 className={generateClassName()}>{props.children}</h2>;
      case "h3":
        return <h3 className={generateClassName()}>{props.children}</h3>;
      case "h4":
        return <h4 className={generateClassName()}>{props.children}</h4>;
      case "h5":
        return <h5 className={generateClassName()}>{props.children}</h5>;
      case "h6":
        return <h6 className={generateClassName()}>{props.children}</h6>;
      default:
        return <h1 className={generateClassName()}>{props.children}</h1>;
    }
  };

  return generateTag();
};

export default Title;
