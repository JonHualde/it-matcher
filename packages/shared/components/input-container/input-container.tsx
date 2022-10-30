interface inputContainerProps {
  width?: string;
  placeholder?: string;
  name: string;
  onChange: (v: string) => void;
  type: string;
  label: string;
  value?: string;
  errors?: any;
  customClass?: string;
}
const InputContainer = (props: inputContainerProps) => {
  return (
    <div className={`flex flex-col mb-5 ${props.width ? "w-" + props.width : "w-full"}`}>
      <label htmlFor={props.name} className={props.errors && "text-red"}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={(e) => props.onChange(e.target.value)}
        className={` focus:outline-none 
          ${props.errors ? "border-red " : ""}
          ${props.customClass && props.customClass}
        `}
        value={props.value && props.value}
      />
      {props.errors && (
        <span className="help-block text-red text-left ml-1">
          {props.errors}
        </span>
      )}
    </div>
  );
};

export default InputContainer;
