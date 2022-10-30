import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import useSWR, { useSWRConfig } from 'swr'

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";

// Hook
import { getUserInfo } from "../../hooks/user";


const AccountInformationForm = () => {
  const myToast = useRef<any>();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [instagramUsername, setInstagramUserName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [notionPageUrl, setNotionPageUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useSWRConfig()

  const { data, isLoading, isError } = getUserInfo();

  const updateStates = (user: any) => {
    setEmail(user.email);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setLinkedInUrl(user.linkedInUrl);
    setGithubUrl(user.githubUrl);
    setInstagramUserName(user.instagramUsername);
    setWebsiteUrl(user.websiteUrl);
    setNotionPageUrl(user.notionPageUrl);
  };

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

    fetch("/api/user/update-profile", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        linkedInUrl,
        instagramUsername,
        notionPageUrl,
        websiteUrl,
        githubUrl,
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
        mutate("/user/get-user-info");
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
    if (!isLoading && !data.user && isError.error) {
      setError(true);
      setErrorMessage(
        "An issue occured while fetching your personal data. Please try again."
      );
      toast.update(myToast.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render: "We could not get your data. Please reload the page",
      });
    }

    if (!isLoading && data.user && !isError?.error) {
      updateStates(data.user);
    }

  }, [data, isLoading, isError]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-8 w-full max-w-xl"
    >
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
      />
      <h5 className="text-blue-dimmed">ACCOUNT INFORMATION</h5>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="text"
        placeholder="John"
        onChange={setFirstname}
        value={isLoading ? "Loading..." : firstname}
        name="firstname"
        label="First name"
      />
      <InputContainer
        type="text"
        placeholder="Doe"
        onChange={setLastname}
        value={isLoading ? "Loading..." : lastname}
        name="lastname"
        label="Last name"
      />
      <InputContainer
        type="email"
        placeholder="email"
        onChange={setEmail}
        value={isLoading ? "Loading..." : email}
        name="email"
        label="Email"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={setLinkedInUrl}
        value={isLoading ? "Loading..." : linkedInUrl}
        name="linkedInUrl"
        label="Linkedin URL"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={setGithubUrl}
        value={isLoading ? "Loading..." : githubUrl}
        name="githubUrl"
        label="Github URL"
      />
      <InputContainer
        type="text"
        placeholder=""
        onChange={setInstagramUserName}
        value={isLoading ? "Loading..." : instagramUsername}
        name="instagramUsername"
        label="Instagram Username"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={setWebsiteUrl}
        value={isLoading ? "Loading..." : websiteUrl}
        name="websiteUrl"
        label="Website URL"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={setNotionPageUrl}
        value={isLoading ? "Loading..." : notionPageUrl}
        name="notionPageUrl"
        label="Notion Page URL"
      />
      <button
        type="submit"
        className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium
            hover:bg-blue-800 mt-4"
      >
        Update Personal Information
      </button>
    </form>
  );
};

export default AccountInformationForm;
