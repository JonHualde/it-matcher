import { useState, useRef } from "react";
import Link from "next/link";
import { ToastContainer, toast, Zoom } from "react-toastify";

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";
import { Modal } from "@shared-components/modals";

// Store
import { useStoreActions, useStoreState } from "easy-peasy";

interface LogInModalProps {
  close: () => void;
  title: string;
  subtitle?: string;
  linkText?: string;
  link?: string;
}

const LogInModal = (props: LogInModalProps) => {
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
    <Modal close={props.close}>
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
    </Modal>
  );
};

export default LogInModal;
