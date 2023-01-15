import { ReactNode, useEffect } from "react";
import { PublicPageFooter } from "@shared-components/public-page-footer";
import { PublicPageHeader } from "@shared-components/public-page-header";
import { PublicPageMobileHeader } from "@shared-components/public-page-header";
import { ToastContainer, Zoom } from "react-toastify";
// States
import { useStoreActions } from "easy-peasy";
// Utils
import { fetchJSON } from "@shared-utils";
import { useAccessToken } from "@shared-hooks";
// var
import { footerHiddenOnRoutes } from "@shared-vars";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

type VerifyTokenResponse = {
  user_id?: number;
  message: string;
};

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
  const updateUserAuth = useStoreActions((actions: any) => actions.updateUserAuthStatus);
  const accessToken = useAccessToken();
  const isFooterHidden = pathname ? footerHiddenOnRoutes.some((route) => pathname.includes(route)) : false;

  const updateUserStatus = (isLoggedIn: boolean, id: number | null) => {
    updateUserAuth({ isLoggedIn, id });
  };

  const verifyToken = async () => {
    const token: { isLoggedIn: boolean; user_id: number | null } = await fetchJSON("auth/verify-token", "GET")
      .then((response: VerifyTokenResponse) => {
        return {
          isLoggedIn: true,
          user_id: response.user_id || null,
        };
      })
      .catch(() => {
        return {
          isLoggedIn: false,
          user_id: null,
        };
      });

    updateUserStatus(token.isLoggedIn, token.user_id);
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
      <>{children}</>
      {!isFooterHidden && <PublicPageFooter />}
    </div>
  );
};

export default PublicPageLayout;
