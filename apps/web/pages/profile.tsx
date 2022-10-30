import AccountInformationForm from "shared/components/forms/account-information-form";
import UpdatePasswordForm from "shared/components/forms/update-password";
import UploadProfilePictureForm from "shared/components/forms/upload-image";
import PrivatePageLayout from "shared/components/layouts/private-page-layout";

// helpers
import Jwt from "../utils/jwt";

const Profile = (props: any) => {
  return (
    <PrivatePageLayout pathname={props.pathname} title={"Edit Information"}>
      <UploadProfilePictureForm />
      <AccountInformationForm />
      <UpdatePasswordForm />
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  let user;

  try {
    user = new Jwt(ctx.req.cookies.access_token).verifyToken();

    if (user.error) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        email: user.email,
        permission: user.permission,
      },
      pathname: ctx.resolvedUrl,
    },
  };
}

export default Profile;
