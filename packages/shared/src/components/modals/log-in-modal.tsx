import { useState, useRef } from "react";
import Link from "next/link";
import { toast, Zoom } from "react-toastify";
// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import { Modal } from "@shared-components/modals";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
// utils
import { fetchJSON } from "@shared-utils";
// types
import { User } from "@shared-types";

interface LogInModalProps {
  close: () => void;
  title: string;
  subtitle?: string;
  linkText?: string;
  link?: string;
  zIndex?: "z-10" | "z-20" | "z-30" | "z-40" | "z-50";
}

const LogInModal = (props: LogInModalProps) => {
  const myToast = useRef<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const updateToast = (type: "SUCCESS" | "ERROR" | "INFO", message: string) => {
    toast.update(myToast.current, {
      type: toast.TYPE[type],
      render: message,
      transition: Zoom,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateToast("INFO", "Logging you in...");
    setError(false);

    fetchJSON("auth/login", "POST", {
      email,
      password,
    })
      .then((user: User) => {
        updateAuthStatus({ isLoggedIn: true, id: user.id });
        updateToast("SUCCESS", "You are now logged in");

        props.close();
      })
      .catch(async (err) => {
        console.error(err);
        updateToast("ERROR", err.message);

        setError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <Modal close={props.close} zIndex={props.zIndex ?? "z-20"}>
      <div className="w-full bg-white px-8">
        <div className="flex w-full flex-col">
          <div className="mb-6">
            <h3 className="text-2xl font-medium leading-6 text-blue-ocean" id="modal-title">
              {props.title}
            </h3>
            <div className="mt-2 mb-3">
              <p className="text-sm text-gray-500">
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
                className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium text-white hover:bg-blue-800"
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
