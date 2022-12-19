import { useState, useEffect } from "react";
import AccountInformationForm from "shared/src/components/forms/account-information-form";
import UpdatePasswordForm from "shared/src/components/forms/update-password";
import UploadProfilePictureForm from "shared/src/components/forms/upload-image";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
// Utils
import { fetchJSON } from "@shared-utils";
// Types
import { User } from "@shared-types";

interface ProfileProps {
  pathname: string;
  user: User;
}

const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User>({
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

  const getUserInfo = async () => {
    const user: any = await fetchJSON("user", "GET").catch((err) => {
      console.log(err);
    });

    console.log("user", user);

    setUser(user as User);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <PrivatePageLayout pathname={props.pathname} title={"Edit Information"}>
      <UploadProfilePictureForm profilePicture={user.profile_picture_ref} />
      <AccountInformationForm user={user} />
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
