interface ButtonProps {
  text: string;
  color?: string;
  hover?: string;
  textColor?: string;
  rounded?: string;
  padding?: string;
  font?: string;
  borderColor?: string;
  disabled?: boolean;
  margin?: string;
  action?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={` 
         flex justify-center 
            ${props.margin ? props.margin : ""}
            ${props.color && !props.disabled ? props.color : "bg-color-600"} 
            ${props.hover ? "hover:" + props.hover : ""} 
            ${props.textColor ? props.textColor : "text-white"} 
            ${props.rounded ? props.rounded : "rounded-sm"} 
            ${props.padding ? props.padding : "py-3 px-6"}
            ${props.font ? props.font : "font-medium"}
            ${
              props.borderColor && !props.disabled
                ? "border-2 " + props.borderColor
                : "border-2 border-gray-800"
            }
            ${props.disabled ? "bg-gray-200 cursor-not-allowed" : null}
        `}
      onClick={props.action && props.action}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.text}
    </button>
  );
};

export default Button;
