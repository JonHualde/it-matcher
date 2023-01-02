import React from "react";

interface CrossProps {
  close: () => void;
}

const Cross = (props: CrossProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-2 right-4 h-10 w-10 cursor-pointer font-light text-blue-dimmed"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      onClick={props.close}
    >
      <path strokeLinecap="round" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default Cross;
