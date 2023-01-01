import { useRef } from "react";

interface CheckboxContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  type: string;
  margin?: string;
  label?: string;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxContainer = (props: CheckboxContainerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative ${props.margin ? props.margin : "mb-5"} ${props.width ? "w-" + props.width : "w-full"}
        flex items-center
    `}
    >
      {props.label && (
        <label
          htmlFor={props.name}
          className={` ${props.errors && "text-red"}
        font-base pr-3 text-lg capitalize
        `}
        >
          {props.label}
        </label>
      )}
      <input
        ref={inputRef}
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={props.onChange}
        className={`h-5 w-5 focus:outline-none
          ${props.errors ? "border-red " : ""}
          ${props.customClass ? props.customClass : ""}
          text-md rounded-md border border-gray-300 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        checked={props.value && props.value}
        disabled={props.disabled ?? false}
      />
      {props.errors && <span className="help-block text-red ml-1 text-left">{props.errors}</span>}
    </div>
  );
};

export default CheckboxContainer;
