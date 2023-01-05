import { useState, useRef } from "react";
import { BsEye, BsEyeSlash, BsArrowCounterclockwise, BsCheck2 } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { notify } from "@shared-utils";
import { useEffect } from "react";

interface inputContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  type: string;
  margin?: string;
  label?: string;
  value?: string | number;
  customClass?: string;
  disabled?: boolean;
  register?: any;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

  const register = (props.register && props.register(props.name)) || {};

  return (
    <div className={`flex flex-col ${props.margin ? props.margin : "mb-5"} ${props.width ? "w-" + props.width : "w-full"}`}>
      <div className="relative flex flex-col">
        {props.label && (
          <label htmlFor={props.name} className={` ${props.error && "text-red-600"} font-base text-lg capitalize`}>
            {props.label}
          </label>
        )}
        <input
          {...register}
          ref={inputRef}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : ""}
          onChange={props.onChange}
          name={props.name}
          className={`
          ${props.error ? "border-red-600" : ""}
          ${props.customClass && props.customClass}
          text-md rounded-md border border-gray-300 px-3 py-2 text-gray-700
          ${props.disabled && "cursor-not-allowed bg-gray-100"}
        `}
          value={props.value && props.value}
          disabled={props.disabled ?? false}
        />
        {props.type === "password" && (
          <div className="absolute right-0 top-4 flex h-full cursor-pointer items-center px-3">
            {show ? <BsEyeSlash size={20} onClick={togglePasswordDisplay} /> : <BsEye size={20} onClick={togglePasswordDisplay} />}
            {props.name === "newPassword" && passwordGenerator()}
          </div>
        )}
      </div>
      {props.error && props.errorMessage?.length && <span className="text-red ml-1 text-left text-red-600">{props.errorMessage}</span>}
    </div>
  );
};

export default InputContainer;
