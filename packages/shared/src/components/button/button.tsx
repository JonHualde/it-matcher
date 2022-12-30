import { ReactElement } from "react";
interface ButtonProps {
  text: string | ReactElement;
  color?: string;
  hover?: string;
  textColor?: string;
  rounded?: string;
  padding?: string;
  font?: string;
  border?: string;
  disabled?: boolean;
  margin?: string;
  action?: () => void;
  type?: "submit" | "button";
  customClass?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      className={` 
         flex justify-center 
            ${props.customClass ? props.customClass : ""}
            ${props.margin ? props.margin : ""}
            ${props.color ? props.color : "bg-blue-400"} 
            ${props.hover ? props.hover : "hover:bg-blue-600"} 
            ${props.textColor ? props.textColor : "text-white"} 
            ${props.rounded ? props.rounded : "rounded-sm"} 
            ${props.padding ? props.padding : "py-3 px-6"}
            ${props.font ? props.font : "font-medium"}
            ${props.border ? props.border : "border-2 border-gray-800"}
            ${props.disabled ? "cursor-not-allowed border-0 bg-gray-200 hover:bg-gray-200" : null}
        `}
      onClick={props.action && props.action}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.text}
    </button>
  );
};

export default Button;
