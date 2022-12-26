import { ReactNode, useEffect } from "react";
import PublicPageFooter from "../public-page-footer/public-page-footer";
import PublicPageHeader from "../public-page-header/public-page-header";
import PublicPageMobileHeader from "../public-page-header/public-page-mobile-header";
import { ToastContainer, Zoom } from "react-toastify";
// States
import { useStoreActions, useStoreState } from "easy-peasy";
// Utils
import { fetchJSON } from "@shared-utils";
import { useAccessToken } from "@shared-hooks";
// var
import { footerHiddenOnRoutes } from "@shared-vars";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
  const updateUserAuth = useStoreActions((actions: any) => actions.updateUserAuthStatus);
  const accessToken = useAccessToken();
  const isFooterHidden = pathname ? footerHiddenOnRoutes.some((route) => pathname.includes(route)) : false;

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
    <div className="relative flex h-screen flex-col">
      <ToastContainer
        className="z-50"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        closeOnClick
        transition={Zoom}
      />
      <PublicPageHeader />
      <PublicPageMobileHeader />
      {children}
      {!isFooterHidden && <PublicPageFooter />}
    </div>
  );
};

export default PublicPageLayout;
