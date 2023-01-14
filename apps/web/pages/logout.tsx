import { useRouter } from "next/router";
// Components
import PublicPageLayout from "@shared-components/layouts/public-page-layout";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const Profile = (props: any) => {
  const router = useRouter();
  const resetAuthAndUserData = useStoreActions((actions: any) => actions.resetAuthAndUserData);
  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  useEffect(() => {
    updateAuthStatus(false);
    resetAuthAndUserData();
    router.push("/");
  }, [updateAuthStatus, resetAuthAndUserData, router]);

  return <PublicPageLayout>Logout</PublicPageLayout>;
};

export default Profile;
