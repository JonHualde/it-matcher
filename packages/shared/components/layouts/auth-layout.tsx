interface AuthLayoutProps {
  children: JSX.Element[] | JSX.Element;
  imgSrc: string;
}

const AuthLayout = ({ children, imgSrc }: AuthLayoutProps) => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-full lg:w-3/6">{children}</div>
      <div className="hidden lg:block lg:w-3/6">
        <div className="w-full h-full">
          <img className="object-cover w-full h-full" src={imgSrc} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
