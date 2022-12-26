interface LoaderProps {
  customClassName?: string;
  size?: number;
  border?: string;
}

const Loader = (props: LoaderProps) => {
  let customClass: string = "";

  const generateClassName = () => {
    if (props.customClassName) {
      customClass += ` ${customClass}`;
    }

    if (props.size) {
      customClass += ` h-${props.size} w-${props.size}`;
    } else {
      customClass += ` h-5 w-5`;
    }

    return customClass;
  };

  return (
    <div
      className={`animate-spin ${generateClassName()} rounded-full 
    ${props.border ? props.border : "border-b-2 border-r-2 border-blue-dimmed"}
  `}
    ></div>
  );
};

export default Loader;
