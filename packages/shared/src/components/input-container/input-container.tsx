interface inputContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  value?: string;
  errors?: any;
  customClass?: string;
  disabled?: boolean;
}
const InputContainer = (props: inputContainerProps) => {
  return (
    <div className={`mb-5 flex flex-col ${props.width ? "w-" + props.width : "w-full"}`}>
      <label
        htmlFor={props.name}
        className={` ${props.errors && "text-red"}
        text-base font-light capitalize
      `}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={props.onChange}
        className={` focus:outline-none 
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

export default InputContainer;
