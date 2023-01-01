import { useRef } from "react";
import { BsEye, BsEyeSlash, BsArrowCounterclockwise, BsCheck2 } from "react-icons/bs";

interface TextareaContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  margin?: string;
  label?: string;
  value: string;
  rows: number;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
}
const TextAreaContainer = (props: TextareaContainerProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={`relative ${props.margin ? props.margin : "mb-5"} flex flex-col ${props.width ? "w-" + props.width : "w-full"}`}>
      {props.label && (
        <label
          htmlFor={props.name}
          className={` ${props.errors && "text-red"}
        font-base text-lg capitalize
        `}
        >
          {props.label}
        </label>
      )}
      <textarea
        ref={inputRef}
        rows={props.rows ? props.rows : 4}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={props.onChange}
        className={`focus:outline-none 
          ${props.errors ? "border-red " : ""}
          ${props.customClass && props.customClass}
          text-md rounded-md border border-gray-300 px-3 py-2 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        value={props.value && props.value}
        disabled={props.disabled ?? false}
      />

      {props.errors && <span className="help-block text-red ml-1 text-left">{props.errors}</span>}
    </div>
  );
};

export default TextAreaContainer;
