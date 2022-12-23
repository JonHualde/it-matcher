interface ItalicProps {
  children: string | JSX.Element;
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
}

const Italic = (props: ItalicProps) => {
  let customClassName: string = "text-sm md:text-base italic";

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

  return <i className={generateClassName()}>{props.children}</i>;
};

export default Italic;
