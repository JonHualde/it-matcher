import { useState, useEffect, useRef, ChangeEvent } from "react";
import AccountInformationForm from "shared/src/components/forms/account-information-form";
import UpdatePasswordForm from "shared/src/components/forms/update-password";
import UploadProfilePictureForm from "shared/src/components/forms/upload-image";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ErrorMessage } from "@shared-components/error-message";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";
// Types
import { User } from "@shared-types";

interface ProfileProps {
  pathname: string;
  user: User;
}

const Profile = (props: ProfileProps) => {
  const myToast = useRef<any>();
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
    console.log("ehey");
    notify(myToast, "Getting your account details...");
    await fetchJSON("user", "GET")
      .then((res) => {
        setUserData(res);
        updateToast(myToast, "SUCCESS", "Your account details successfully retrieved");
      })
      .catch((err) => {
        console.log(err);
        updateToast(myToast, "ERROR", err.message);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    notify(myToast, "Updating your account details...");

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
        updateToast(myToast, "SUCCESS", "Your account details have been updated successfully");
        setUserData(result.user);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
        updateToast(myToast, "ERROR", error.message);
      });
  };

  return (
    <PrivatePageLayout pathname={props.pathname} title={"Edit Information"}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <UploadProfilePictureForm profilePicture={userData.profile_picture_ref} />
      <AccountInformationForm handleSubmit={handleSubmit} userData={userData} updateUserData={updateUserData} />
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
