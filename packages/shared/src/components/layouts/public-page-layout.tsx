import { ReactNode, useEffect } from "react";
import PublicPageFooter from "../public-page-footer/public-page-footer";
import PublicPageHeader from "../public-page-header/public-page-header";
import PublicPageMobileHeader from "../public-page-header/public-page-mobile-header";
// States
import { useStoreState, useStoreActions } from "easy-peasy";
// Hooks
import { useTokenVerification, useCheckTokens } from "@shared-hooks";
interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
  const updateUserAuth = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const updateUserStatus = (isLoggedIn: boolean | null) => {
    updateUserAuth(isLoggedIn);
  };

  const verifyToken = async () => {
    const isTokenValid = await useTokenVerification();
    updateUserStatus(isTokenValid);
  };

  useEffect(() => {
    const checkTokens = async () => {
      const tokens = await useCheckTokens();
      if (tokens) {
        verifyToken();
        return;
      }

      updateUserStatus(false);
    };

    checkTokens();
  }, []);

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
