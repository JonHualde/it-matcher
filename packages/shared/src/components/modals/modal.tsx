import { bgOpacity, ModalMaxSize, zIndex } from "@shared-types";

interface ModalProps {
  close: () => void;
  children: React.ReactNode | JSX.Element;
  zIndex?: zIndex;
  customClass?: string;
  size?: ModalMaxSize;
}

const Modal = (props: ModalProps) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${props.zIndex ?? "z-20"} overflow-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-300 bg-opacity-40" aria-hidden="true" onClick={props.close}></div>
      <div className="flex min-h-screen items-center justify-center text-center sm:block">
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`inline-block ${props.size ?? "max-w-md"} 
          w-[90vw] transform overflow-auto rounded-lg bg-white px-3 py-10 text-left align-bottom shadow-lg 
          transition-all sm:my-8 sm:w-full sm:px-8 sm:align-middle`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 right-3 h-7 w-7 cursor-pointer text-blue-ocean"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={props.close}
          >
            <path strokeLinecap="round" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
