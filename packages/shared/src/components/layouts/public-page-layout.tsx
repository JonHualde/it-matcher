import { ReactNode } from "react";
import PublicPageFooter from "../public-page-footer/public-page-footer";
import PublicPageHeader from "../public-page-header/public-page-header";
import PublicPageMobileHeader from "../public-page-header/public-page-mobile-header";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
}

const PublicPageLayout = ({ children, pathname }: PublicPageLayoutProps) => {
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
