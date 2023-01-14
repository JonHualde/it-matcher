import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
// Components
import PrivatePageHeader from "../private-page-header/private-page-header";
import PrivatePageSidebar from "../private-page-sidebar/private-page-sidebar";
import { Title } from "@shared-components/typography";
import { ToastContainer, Zoom } from "react-toastify";
// Hooks
import { useTokenVerification } from "@shared-hooks";

interface PublicPageLayoutProps {
  children?: any;
  pathname?: any;
  title: string;
  cta?: ReactElement;
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
      <PrivatePageHeader />
      <div className="flex h-[calc(100%-60px)]">
        {/* <PrivatePageSidebar pathname={props.pathname} />
        <div className="flex w-full flex-col overflow-y-auto px-10 py-8">
          <div className="flex items-center justify-between">
            <Title type="h2" customClassName="text-blue-dimmed my-0 mb-4">
              {props.title}
            </Title>
            {props.cta && props.cta}
          </div>
          {props.children}
        </div> */}
      </div>
    </div>
  );
};

export default PrivatePageLayout;
