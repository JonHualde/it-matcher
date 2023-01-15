interface AuthLayoutProps {
  children: JSX.Element[] | JSX.Element;
  imgSrc: string;
}

const AuthLayout = ({ children, imgSrc }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-full lg:w-4/6 xl:w-3/6">{children}</div>
      <div className="hidden lg:block lg:w-2/6 xl:w-3/6">
        <div className="h-full w-full">
          <img className="h-full w-full object-cover" src={imgSrc} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
