import React, { useRef, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";
// Utils
import { fetchJSON } from "@shared-utils";

const UpdatePasswordForm = () => {
  const myToast = useRef<any>();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notify = () =>
    (myToast.current = toast(<Toast successMessage="Uploading your picture..." />, {
      autoClose: false,
      closeButton: false,
      type: toast.TYPE.INFO,
      transition: Zoom,
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    notify();

    e.preventDefault();
    setError(false);

    fetchJSON("auth/reset-password", "PATCH", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((res: any): any => {
        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "Your password has been reset successfully",
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error: any) => {
        setError(true);
        setErrorMessage(error.message);

        toast.update(myToast.current, {
          type: toast.TYPE.ERROR,
          autoClose: 5000,
          render: error.message,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16 flex w-full max-w-xl flex-col">
      <h5 className="text-blue-dimmed">CHANGE PASSWORD</h5>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="password"
        onChange={setCurrentPassword}
        value={currentPassword}
        name="currentPassword"
        label="Current Password"
      />
      <InputContainer type="password" onChange={setNewPassword} value={newPassword} name="NewPassword" label="New Password" />
      <InputContainer
        type="password"
        onChange={setConfirmNewPassword}
        value={confirmNewPassword}
        name="ConfirmNewPassword"
        label="Confirm New Password"
      />
      <button
        type="submit"
        className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
            text-white hover:bg-blue-800"
      >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
