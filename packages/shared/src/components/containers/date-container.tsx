import { useRef } from "react";

interface CheckboxContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  margin?: string;
  label?: string;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DateContainer = (props: CheckboxContainerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative ${props.margin ? props.margin : "mb-5"} ${props.width ? "w-" + props.width : "w-full"}
        flex items-center
    `}
    >
      {props.label && (
        <label
          className={` ${props.errors && "text-red"}
        font-base pr-3 text-lg capitalize
        `}
        >
          {props.label}
        </label>
      )}
      <input
        onClick={() => {
          inputRef.current?.focus();
        }}
        ref={inputRef}
        type="date"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={props.onChange}
        className={`transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500
          ${props.errors ? "border-red " : ""}
          ${props.customClass ? props.customClass : ""}
          text-md rounded-md border border-gray-300 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        value={props.value && props.value}
        disabled={props.disabled ?? false}
      />
      {props.errors && <span className="help-block text-red ml-1 text-left">{props.errors}</span>}
    </div>
  );
};

export default DateContainer;
