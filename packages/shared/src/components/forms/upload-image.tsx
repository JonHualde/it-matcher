import React, { useRef, useEffect, useState } from "react";
// Components
import { ErrorMessage } from "../error-message";
import { Loader } from "@shared-components/status";
import { Title } from "@shared-components/typography";
// utils
import { fetchFormData, notify, updateToast } from "@shared-utils";
// Types
import { User } from "@shared-types";

interface ProfilePictureFormProps {
  profilePicture: string | null;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const UploadProfilePictureForm = ({ profilePicture, setUserData }: ProfilePictureFormProps) => {
  const userProfilePicture = React.useRef<Blob | any>();
  const myToast = useRef<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userProfilePicture.current.files[0]) {
      notify({ myToast, toastId: 3, message: "Please select a picture to upload", autoClose: 3000 });
      return;
    }
    setError(false);
    setIsSubmitting(true);

    notify({ myToast, toastId: 4, message: "Uploading your picture..." });

    const form = new FormData();
    form.append("profilePicture", userProfilePicture.current.files[0]);

    fetchFormData("user/upload-picture", "POST", form)
      .then((user: User) => {
        updateToast({ myToast, toastId: 4, type: "SUCCESS", message: "Your picture has been saved successfully" });
        setUserData((userData) => ({
          ...userData,
          profile_picture_ref: user.profile_picture_ref,
        }));
        userProfilePicture.current.value = "";
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setErrorMessage(error.message);
        updateToast({ myToast, toastId: 4, type: "ERROR", message: error.message[0] });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    // <>
    //   {isLoading ? (
    //     <div>...loading</div>
    //   ) : (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl">
      <Title type="h5" customClassName="text-blue-dimmed mb-8">
        PROFILE PICTURE
      </Title>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <div className="flex flex-row items-end justify-between">
        <div className="w-1/2">
          <img
            className="h-[280px] w-full rounded-full object-cover"
            src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
              profilePicture ? "/" + profilePicture : "/pictures/Generic-Profile-1600x1600.png"
            } `}
            alt="test"
          />
        </div>

        <div className="ml-6 w-1/2">
          <input ref={userProfilePicture} accept="image/*" type="file" name="userProfilePicture" className="w-9/12" />
          <button
            type="submit"
            className="mt-4 flex w-9/12 justify-center rounded-sm bg-blue-ocean py-3 font-medium
                text-white hover:bg-blue-800"
          >
            {isSubmitting ? <Loader border="border-b-2 border-r-2 border-white" /> : "Upload"}
          </button>
          <p className="mt-3">Accepted files: .jpg, .jpeg. </p>
          <p>The file cannot exceed 2Mb</p>
        </div>
      </div>
    </form>
    //     )}
    //   </>
  );
};

export default UploadProfilePictureForm;
