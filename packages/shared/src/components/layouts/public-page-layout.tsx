import { ReactNode, useEffect } from "react";
import PublicPageFooter from "../public-page-footer/public-page-footer";
import PublicPageHeader from "../public-page-header/public-page-header";
import PublicPageMobileHeader from "../public-page-header/public-page-mobile-header";
// States
import { useStoreActions, useStoreState } from "easy-peasy";
// Utils
import { fetchJSON } from "@shared-utils";
import { useAccessToken } from "@shared-hooks";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
  const updateUserAuth = useStoreActions((actions: any) => actions.updateUserAuthStatus);
  const user = useStoreState((state: any) => state.user);
  const accessToken = useAccessToken();

  const updateUserStatus = (isLoggedIn: boolean, id: number | null) => {
    updateUserAuth({ isLoggedIn, id });
  };

  const verifyToken = async () => {
    const token = await fetchJSON("auth/verify-token", "GET")
      .then((res) => {
        return {
          isLoggedIn: true,
          userId: res.userId,
        };
      })
      .catch(() => {
        return {
          isLoggedIn: false,
          userId: null,
        };
      });

    updateUserStatus(token.isLoggedIn, token.userId);
  };

  useEffect(() => {
    if (!accessToken) {
      updateUserAuth(false, null);
      return;
    }

    verifyToken();
  }, [accessToken]);

  return (
    <div className="flex h-screen flex-col justify-between">
      <PublicPageHeader />
      <PublicPageMobileHeader />
      {children}
      {!pathname && <PublicPageFooter />}
    </div>
  );
};

export default PublicPageLayout;
