interface BadgeProps {
  color: "green" | "red" | "yellow";
  customClassName?: string;
  children: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

const Badge = (props: BadgeProps) => {
  let customClassName: string = `px-3 py-1 rounded-${props.rounded || "md"}`;

  const generateClassName = (): string => {
    if (props.color) {
      customClassName += ` bg-status-light-${props.color} text-status-${props.color}`;
    }

    if (props.customClassName) {
      customClassName += ` ${props.customClassName}`;
    }

    return customClassName;
  };

  return <div className={generateClassName()}>{props.children}</div>;
};

export default Badge;
