import { ReactNode } from "react";
import PrivatePageHeader from "../private-page-header/private-page-header";
import PrivatePageSidebar from "../private-page-sidebar/private-page-sidebar";
import Title from "../title/title";

interface PublicPageLayoutProps {
  children: ReactNode;
  pathname?: any;
  title: string;
}

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
  return (
    <div className="h-screen max-w-screen flex flex-col">
      <PrivatePageHeader />
      <div className="flex h-[calc(100%-80px)]">
        <PrivatePageSidebar pathname={props.pathname} />
        <div className="w-full overflow-y-auto flex flex-col px-10 py-10 ">
          <Title title={props.title} />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PrivatePageLayout;
