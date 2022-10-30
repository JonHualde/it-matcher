import PrivatePageLayout from "shared/components/layouts/private-page-layout";

const Profile = (props: any) => {
  return <PrivatePageLayout pathname={props.pathname} title={"Logout"}></PrivatePageLayout>;
};

export async function getServerSideProps(ctx: any) {
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}

export default Profile;
