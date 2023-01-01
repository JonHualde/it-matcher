import React, { useRef, useState } from "react";
// Components
import { InputContainer } from "@shared-components/containers";
import { ErrorMessage } from "../error-message";
import { Loader } from "@shared-components/status";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const UpdatePasswordForm = () => {
  const myToast = useRef<any>();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setIsSubmitting(true);

    notify({ myToast, toastId: 6, message: "Updating your password" });

    fetchJSON("auth/reset-password", "PATCH", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((res: any): any => {
        updateToast({ myToast, toastId: 6, type: "SUCCESS", message: "Your password has been reset successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error: any) => {
        setError(true);
        setErrorMessage(error.message);
        updateToast({ myToast, toastId: 6, type: "ERROR", message: error.message[0] });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xl flex-col">
      <h5 className="text-blue-dimmed">CHANGE PASSWORD</h5>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="password"
        onChange={(e) => setCurrentPassword(e.target.value)}
        value={currentPassword}
        name="currentPassword"
        label="Current Password"
      />
      <InputContainer
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
        name="newPassword"
        label="New Password"
      />
      <InputContainer
        type="password"
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        value={confirmNewPassword}
        name="confirmNewPassword"
        label="Confirm New Password"
      />
      <button
        type="submit"
        className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
            text-white hover:bg-blue-800"
      >
        {isSubmitting ? <Loader border="border-b-2 border-r-2 border-white" /> : "Update Password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
