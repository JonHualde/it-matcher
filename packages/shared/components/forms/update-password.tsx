import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";

const UpdatePasswordForm = () => {
  const myToast = useRef<any>();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notify = () =>
    (myToast.current = toast(
      <Toast successMessage="Uploading your picture..." />,
      {
        autoClose: false,
        closeButton: false,
        type: toast.TYPE.INFO,
        transition: Zoom,
      }
    ));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    notify();
    e.preventDefault();
    setError(false);

    console.log(password, newPassword, confirmNewPassword);

    fetch("/api/user/update-password", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        password,
        newPassword,
        confirmNewPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) throw new Error(result.errorMessage);

        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "Your password has been reset successfully",
        });

        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        console.error(error);
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-16 w-full max-w-xl"
    >
      <ToastContainer
        position="top-right"
        // autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
      />
      <h5 className="text-blue-dimmed">CHANGE PASSWORD</h5>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="password"
        onChange={setPassword}
        value={password}
        name="currentPassword"
        label="Current Password"
      />
      <InputContainer
        type="password"
        onChange={setNewPassword}
        value={newPassword}
        name="NewPassword"
        label="New Password"
      />
      <InputContainer
        type="password"
        onChange={setConfirmNewPassword}
        value={confirmNewPassword}
        name="ConfirmNewPassword"
        label="Confirm New Password"
      />
      <button
        type="submit"
        className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium
            hover:bg-blue-800 mt-4"
      >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePasswordForm;