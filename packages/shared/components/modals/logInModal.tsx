import { useState, useRef } from "react";
import Link from "next/link";
import { ToastContainer, toast, Zoom } from "react-toastify";

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";

// Store
import { useStoreActions, useStoreState } from "easy-peasy";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  subtitle?: string;
  linkText?: string;
  link?: string;
}

const Modal = (props: ModalProps) => {
  const myToast = useRef<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateAuthStatus = useStoreActions(
    (actions: any) => actions.updateUserAuthStatus
  );

  const notify = () =>
    (myToast.current = toast(<Toast successMessage="Logging you in..." />, {
      autoClose: false,
      closeButton: false,
      type: toast.TYPE.INFO,
      transition: Zoom,
    }));

  const dismiss = () => toast.dismiss();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    notify();

    e.preventDefault();
    setError(false);

    fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) throw new Error(result.errorMessage);

        updateAuthStatus(true);
        props.close();
        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "You are now logged in",
        });
      })
      .catch(async (err) => {
        console.error(err);
        setError(true);
        setErrorMessage(err.message);
        toast.update(myToast.current, {
          type: toast.TYPE.ERROR,
          autoClose: 5000,
          render: err.message,
        });
      });
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity"
          aria-hidden="true"
          onClick={props.close}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle max-w-md sm:w-full py-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute top-3 right-3 text-blue-ocean cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={props.close}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="bg-white px-8 w-full">
            <div className="flex flex-col w-full">
              <div className="mb-6">
                <h3
                  className="text-2xl leading-6 font-medium text-blue-ocean"
                  id="modal-title"
                >
                  {props.title}
                </h3>
                <div className="mt-2 mb-3">
                  <p className="text-sm text-gray-500">
                    {props.subtitle && props.subtitle}{" "}
                    {props.link ? (
                      <Link href={props.link}>
                        <a className="ml-1 text-link-color underline">
                          {props.linkText}
                        </a>
                      </Link>
                    ) : null}
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  {error && <ErrorMessage errorMessage={errorMessage} />}
                  <InputContainer
                    type="email"
                    placeholder="email"
                    onChange={setEmail}
                    name="email"
                    label="Email"
                  />
                  <InputContainer
                    type="password"
                    placeholder="password"
                    onChange={setPassword}
                    name="password"
                    label="Password"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium hover:bg-blue-800 mt-4"
                  >
                    Log in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
