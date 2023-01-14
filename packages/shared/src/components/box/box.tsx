import { ReactElement, ReactNode } from "react";

interface BoxProps {
  customClassName?: string;
  size?: number;
  children: any;
  border?: string;
}

const Box = (props: BoxProps) => {
  let customClass: string = "";

  const generateClassName = () => {
    if (props.customClassName) {
      customClass += ` ${customClass}`;
    }

    if (props.size) {
      customClass += ` h-${props.size} w-${props.size} px-12 py-6`;
    } else {
      customClass += ` h-auto w-auto px-12 py-6`;
    }

    return customClass;
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center rounded-md  
        ${props.border ? props.border : "border-2 border-blue-dimmed"} shadow-xl 
      ${generateClassName()}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Box;
