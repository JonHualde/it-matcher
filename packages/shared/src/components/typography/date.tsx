import { getDate } from "@shared-utils";

interface DateProps {
  children: string | Date;
  color?: "blue-dimmed" | "blue-ocean" | "blue-purple";
  customClassName?: string;
}

const Date = (props: DateProps) => {
  let customClassName: string = "text-sm md:text-base";

  const generateClassName = (): string => {
    if (props.color) {
      customClassName += ` text-${props.color}`;
    }

    if (props.customClassName) {
      customClassName += ` ${props.customClassName}`;
    }

    return customClassName;
  };

  return <p className={generateClassName()}>{getDate(props.children)}</p>;
};

export default Date;
