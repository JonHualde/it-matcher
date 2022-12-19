import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";
// Types
import { User } from "@shared-types";

interface AccountInformationFormProps {
  user: User;
}

const AccountInformationForm = ({ user }: AccountInformationFormProps) => {
  const myToast = useRef<any>();
  const [userData, setUserData] = useState<User>(user);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateStates = (user: User) => {
    setUserData((userData) => ({
      ...userData,
      email: user.email,
      firstname: user.first_name,
      lastname: user.last_name,
      linkedInUrl: user.linkedIn_url,
      githubUrl: user.github_url,
      instagramUsername: user.instagram_username,
      websiteUrl: user.website_url,
      notionPageUrl: user.notion_page_url,
    }));
  };

  const updateUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

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

    fetch("/api/user/update-profile", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        firstname: userData.first_name,
        lastname: userData.last_name,
        linkedInUrl: userData.linkedIn_url,
        githubUrl: userData.github_url,
        instagramUsername: userData.instagram_username,
        websiteUrl: userData.website_url,
        notionPageUrl: userData.notion_page_url,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.errorMessage);

        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "Your account details have been updated successfully",
        });

        updateStates(result.user);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);

        toast.update(myToast.current, {
          type: toast.TYPE.ERROR,
          autoClose: 5000,
          render: error.message,
        });
      });
  };

  useEffect(() => {
    if (user.email.length) {
      updateStates(user);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xl flex-col">
      <ToastContainer position="top-right" hideProgressBar={true} newestOnTop={false} rtl={false} pauseOnFocusLoss />
      <h5 className="text-blue-dimmed">ACCOUNT INFORMATION</h5>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="text"
        placeholder="John"
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.first_name}
        name="firstname"
        label="first_name"
      />
      <InputContainer
        type="text"
        placeholder="Doe"
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.last_name}
        name="lastname"
        label="last_name"
      />
      <InputContainer
        type="email"
        placeholder="email"
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.email}
        name="email"
        label="email"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.linkedIn_url ?? ""}
        name="linkedInUrl"
        label="linkedIn_url"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.github_url ?? ""}
        name="githubUrl"
        label="github_url"
      />
      <InputContainer
        type="text"
        placeholder=""
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.instagram_username ?? ""}
        name="instagramUsername"
        label="Instagram Username"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.website_url ?? ""}
        name="websiteUrl"
        label="website_url"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement> | any) => updateUserData(e)}
        value={userData.notion_page_url ?? ""}
        name="notionPageUrl"
        label="notion_page_url"
      />
      <button
        type="submit"
        className="hover:bg-blue-800 mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3
            font-medium text-white"
      >
        Update Personal Information
      </button>
    </form>
  );
};

export default AccountInformationForm;
