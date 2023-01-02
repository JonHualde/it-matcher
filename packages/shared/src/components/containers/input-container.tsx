import { useState, useRef } from "react";
import { BsEye, BsEyeSlash, BsArrowCounterclockwise, BsCheck2 } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { notify } from "@shared-utils";

interface inputContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  margin?: string;
  label?: string;
  value?: string | number;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
}
const InputContainer = (props: inputContainerProps) => {
  const myToast = useRef<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const togglePasswordDisplay = () => {
    setShow(!show);
    if (inputRef.current) {
      inputRef.current.type = show ? "password" : "text";
    }
  };

  const passwordGenerator = () => {
    return (
      <>
        <div className="px-2">
          {copied ? (
            <BsCheck2 size={20} />
          ) : (
            <BiCopy
              size={20}
              onClick={() => {
                notify({ myToast, message: "Password copied to clipboard", autoClose: 2000 });
                setTimeout(() => {
                  setCopied(false);
                }, 2500);

                setCopied(true);
              }}
            />
          )}
        </div>
        <BsArrowCounterclockwise
          size={20}
          onClick={() => {
            const password = Math.random().toString(36).slice(-12);

            if (inputRef.current) {
              inputRef.current.value = password;
              inputRef.current.focus();
            }
          }}
        />
      </>
    );
  };

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
      <input
        ref={inputRef}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={props.onChange}
        className={`transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${props.errors ? "border-red " : ""}
          ${props.customClass && props.customClass}
          text-md rounded-md border border-gray-300 px-3 py-2 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
        value={props.value && props.value}
        disabled={props.disabled ?? false}
      />
      {props.type === "password" && (
        <div className="absolute right-0 top-3.5 flex h-full cursor-pointer items-center px-3">
          {show ? <BsEyeSlash size={20} onClick={togglePasswordDisplay} /> : <BsEye size={20} onClick={togglePasswordDisplay} />}
          {props.name === "newPassword" && passwordGenerator()}
        </div>
      )}
      {props.errors && <span className="help-block text-red ml-1 text-left">{props.errors}</span>}
    </div>
  );
};

export default InputContainer;
