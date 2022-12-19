import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useSWRConfig } from "swr";
// Components
import { ErrorMessage } from "../error-message";
import Toast from "../toast/toast";

interface ProfilePictureFormProps {
  profilePicture: string | null | undefined;
}

const UploadProfilePictureForm = ({ profilePicture }: ProfilePictureFormProps) => {
  const userProfilePicture = React.useRef<Blob | any>();
  const myToast = useRef<any>();
  const [image, setImage] = useState<string | null | undefined>(profilePicture);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useSWRConfig();

  // const { profilePicture, isLoading, isError } = getUserPicture();

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

    let form = new FormData();
    form.append("profilePicture", userProfilePicture.current);

    fetch("/api/user/upload-profile-picture", {
      method: "post",
      body: form,
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.error) throw new Error(result.errorMessage);
        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "Your picture has been saved successfully",
        });

        if (error) throw new Error("We could not display your new profile picture, please reload the page");

        mutate(["/user/get-profile-picture", undefined, true]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      userProfilePicture.current = e.target.files[0];
    }
  };

  // useEffect(() => {
  //   if (!isLoading && !profilePicture && isError.error) {
  //     setImage(() => "");
  //     setError(() => true);
  //     setErrorMessage(() => isError.message)
  //   }

  //   if (!isLoading && profilePicture && !isError?.error) {
  //     if(profilePicture.size === 27) {
  //       setImage(() => "/images/placeholder.png");
  //     } else {
  //       const imageObjectUrl = URL.createObjectURL(profilePicture);
  //       setImage(() => imageObjectUrl);
  //     }
  //   }
  // }, [setImage, profilePicture, isLoading, isError]);

  return (
    // <>
    //   {isLoading ? (
    //     <div>...loading</div>
    //   ) : (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl">
      <ToastContainer position="top-right" hideProgressBar={true} newestOnTop={false} rtl={false} pauseOnFocusLoss />
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <div className="flex flex-row items-end justify-between">
        <div className="w-1/2">
          <img className="h-auto h-[280px] rounded-full object-cover" src={image ? image : "/images/placeholder.png"} alt="test" />
        </div>

        <div className="ml-6 w-1/2">
          <input
            ref={userProfilePicture}
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            name="userProfilePicture"
            className="w-9/12"
          />
          <img src={image ?? ""} alt="profile_picture" />
          <button
            type="submit"
            className="hover:bg-blue-800 mt-4 flex w-9/12 justify-center rounded-sm bg-blue-ocean py-3
                font-medium text-white"
          >
            Upload New Picture
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
