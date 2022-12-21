interface ItalicProps {
  children: string | JSX.Element;
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
}

const Italic = (props: ItalicProps) => {
  let customClassName: string = "text-sm md:text-base italic";

  const generateClassName = (): string => {
    if (props.color) {
      customClassName += ` text-${props.color}`;
    }

    if (props.customClassName) {
      customClassName += ` ${props.customClassName}`;
    }

    return customClassName;
  };

  return <i className={generateClassName()}>{props.children}</i>;
};

export default Italic;
