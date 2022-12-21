interface ModalProps {
  close: () => void;
  children: React.ReactNode | JSX.Element;
  zIndex?: "z-10" | "z-20" | "z-30" | "z-40" | "z-50";
  size?:
    | "max-w-xs"
    | "max-w-sm"
    | "max-w-md"
    | "max-w-lg"
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl";
}

const Modal = (props: ModalProps) => {
  return (
    <div className={`fixed -inset-6 ${props.zIndex ?? "z-20"} overflow-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center text-center sm:block">
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity" aria-hidden="true" onClick={props.close}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`inline-block ${props.size ?? "max-w-md"} transform overflow-auto rounded-lg bg-white px-8 py-10 text-left align-bottom
          shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle`}
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
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
