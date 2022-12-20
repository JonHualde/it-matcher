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

  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

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

        updateAuthStatus({ isLoggedIn: true, id: result.user.id });
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
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block">
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity" aria-hidden="true" onClick={props.close}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="relative inline-block max-w-md transform overflow-hidden rounded-lg bg-white py-8 text-left align-bottom
                shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle"
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
          <div className="w-full bg-white px-8">
            <div className="flex w-full flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-medium leading-6 text-blue-ocean" id="modal-title">
                  {props.title}
                </h3>
                <div className="mt-2 mb-3">
                  <p className="text-gray-500 text-sm">
                    {props.subtitle && props.subtitle}{" "}
                    {props.link ? (
                      <Link href={props.link}>
                        <a className="text-link-color ml-1 underline">{props.linkText}</a>
                      </Link>
                    ) : null}
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  {error && <ErrorMessage errorMessage={errorMessage} />}
                  <InputContainer type="email" placeholder="email" onChange={setEmail} name="email" label="Email" />
                  <InputContainer type="password" placeholder="password" onChange={setPassword} name="password" label="Password" />
                  <button
                    type="submit"
                    className="hover:bg-blue-800 mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium text-white"
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
