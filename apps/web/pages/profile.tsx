import { useState, useEffect, useRef, ChangeEvent } from "react";
import AccountInformationForm from "shared/src/components/forms/account-information-form";
import UpdatePasswordForm from "shared/src/components/forms/update-password";
import UploadProfilePictureForm from "shared/src/components/forms/upload-image";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ErrorMessage } from "@shared-components/error-message";
// Utils
import { fetchJSON, notify, updateToast, dismiss } from "@shared-utils";
// Types
import { User } from "@shared-types";

interface ProfileProps {
  pathname: string;
  user: User;
}

const Profile = (props: ProfileProps) => {
  const myToast = useRef<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<User>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    permission: 0,
    linkedIn_url: "",
    instagram_username: "",
    github_url: "",
    website_url: "",
    notion_page_url: "",
    profile_picture_ref: "",
  });

  const updateUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const getUserInfo = async () => {
    notify(myToast, "Getting your account details...", true);
    await fetchJSON("user", "GET")
      .then((res) => {
        setUserData(res);
        updateToast(myToast, "SUCCESS", "Your account details successfully retrieved");
      })
      .catch((err) => {
        console.log(err);
        updateToast(myToast, "ERROR", err.message);
      })
      .finally(() => {
        dismiss(myToast);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setIsSubmitting(true);

    notify(myToast, "Updating your account details...");

    // Update user info
    fetchJSON("user", "PATCH", {
      first_name: userData.first_name,
      last_name: userData.last_name,
      linkedIn_url: userData.linkedIn_url,
      github_url: userData.github_url,
      instagram_username: userData.instagram_username,
      website_url: userData.website_url,
      notion_page_url: userData.notion_page_url,
    })
      .then((user: User) => {
        updateToast(myToast, "SUCCESS", "Your account details have been updated successfully");
        setUserData((userData) => ({
          ...userData,
          first_name: user.first_name,
          last_name: user.last_name,
          linkedIn_url: user.linkedIn_url,
          github_url: user.github_url,
          instagram_username: user.instagram_username,
          website_url: user.website_url,
          notion_page_url: user.notion_page_url,
        }));
      })
      .catch((err) => {
        console.log(err);
        updateToast(myToast, "ERROR", err.message);
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <PrivatePageLayout pathname={props.pathname} title={"Edit Information"}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <UploadProfilePictureForm setUserData={setUserData} profilePicture={userData.profile_picture_ref as string} />
      <AccountInformationForm isSubmitting={isSubmitting} handleSubmit={handleSubmit} userData={userData} updateUserData={updateUserData} />
      <UpdatePasswordForm />
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      pathname: ctx.resolvedUrl,
    },
  };
}

export default Profile;
