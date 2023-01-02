import { useRef } from "react";
import { Badge } from "@shared-components/status";

interface TextareaContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  margin?: string;
  label?: string;
  value: string;
  rows: number;
  error: string;
  customClass?: string;
  disabled?: boolean;
  counterLimit?: number;
}
const TextAreaContainer = (props: TextareaContainerProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={`relative ${props.margin ? props.margin : "mb-5"} flex flex-col ${props.width ? "w-" + props.width : "w-full"}`}>
      {props.label && (
        <label
          htmlFor={props.name}
          className={` ${props.error && "text-red-500"}
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
          ${props.error ? " border border-red-500 " : " "}
          ${props.customClass && props.customClass}
          text-md rounded-md border border-gray-300 px-3 py-2 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        value={props.value && props.value}
        disabled={props.disabled ?? false}
      />

      <div className="relative mt-2 flex justify-end">
        {props.error && <span className="absolute left-0 text-left text-sm text-red-500">{props.error}</span>}
        {/* Write a piece of code that checks the number of characters typed in the description field */}
        {props.counterLimit && (
          <Badge color={props.value.length < props.counterLimit ? "blue" : "red"} customClassName="text-xs">
            <>
              {props.value.length} / {props.counterLimit}
            </>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default TextAreaContainer;
