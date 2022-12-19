import { ReactNode } from "react";
import { useRouter } from "next/router";
// Components
import PrivatePageHeader from "../private-page-header/private-page-header";
import PrivatePageSidebar from "../private-page-sidebar/private-page-sidebar";
import Title from "../title/title";
// Hooks
import { useTokenVerification } from "@shared-hooks";
interface PublicPageLayoutProps {
  children?: ReactNode;
  pathname?: any;
  title: string;
}

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
  const router = useRouter();
  const isTokenValid = useTokenVerification();

  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  if (!isTokenValid) {
    router.push("/login");
  }

  return (
    <div className="max-w-screen flex h-screen flex-col">
      <PrivatePageHeader />
      <div className="flex h-[calc(100%-80px)]">
        <PrivatePageSidebar pathname={props.pathname} />
        <div className="flex w-full flex-col overflow-y-auto px-10 py-10 ">
          <Title title={props.title} />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PrivatePageLayout;
