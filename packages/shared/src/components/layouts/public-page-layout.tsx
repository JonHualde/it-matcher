import { ReactNode, useEffect } from "react";
import PublicPageFooter from "../public-page-footer/public-page-footer";
import PublicPageHeader from "../public-page-header/public-page-header";
import PublicPageMobileHeader from "../public-page-header/public-page-mobile-header";
// States
import { useStoreActions, useStoreState } from "easy-peasy";
// Hooks
import { useCheckTokens } from "@shared-hooks";
// Utils
import { fetchJSON } from "@shared-utils";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
  const updateUserAuth = useStoreActions((actions: any) => actions.updateUserAuthStatus);
  const tokens = useCheckTokens();
  const user = useStoreState((state: any) => state);

  useEffect(() => {
    console.log("5", user);
  }, [user]);

  const updateUserStatus = (isLoggedIn: boolean, id: number | null) => {
    updateUserAuth({ isLoggedIn, id });
  };

  const verifyToken = async () => {
    const token = await fetchJSON("auth/verify-token", "GET")
      .then((res) => {
        return {
          userId: res.userId,
          isLoggedIn: true,
        };
      })
      .catch(() => {
        return {
          userId: null,
          isLoggedIn: true,
        };
      });

    updateUserStatus(token.isLoggedIn, token.userId);
  };

  useEffect(() => {
    const checkTokens = async () => {
      if (tokens) {
        verifyToken();
        return;
      }

      updateUserStatus(false, null);
    };

    checkTokens();
  }, [tokens]);

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
