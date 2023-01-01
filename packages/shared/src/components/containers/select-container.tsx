import { useState, useRef } from "react";

interface SelectContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  margin?: string;
  label?: string;
  value?: string | number;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
  optionsList: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectContainer = (props: SelectContainerProps) => {
  const inputRef = useRef<HTMLSelectElement>(null);

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
      <select
        ref={inputRef}
        value={props.value && props.value}
        onChange={props.onChange}
        name={props.name}
        className={`focus:outline-none 
        ${props.errors ? "border-red " : ""}
        ${props.customClass && props.customClass}
        text-md rounded-md border border-gray-300 px-3 py-3 text-gray-700
        ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        placeholder={props.placeholder ? props.placeholder : ""}
        disabled={props.disabled ?? false}
      >
        {props.optionsList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.errors && <span className="help-block text-red ml-1 text-left">{props.errors}</span>}
    </div>
  );
};

export default SelectContainer;
