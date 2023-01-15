import { useRouter } from "next/router";
import LoginForm from "@shared-components/forms/login-form";

// Layout
import AuthLayout from "shared/src/components/layouts/auth-layout";

const Login = () => {
  const router = useRouter();

  return (
    <AuthLayout imgSrc="/images/login.png">
      <div className="relative flex h-full w-full flex-col items-center justify-center break-words py-4">
        <div className="top-1/2 left-1/2 block w-full p-0 sm:p-2 md:w-2/3 lg:absolute lg:w-4/5 lg:-translate-y-2/3 lg:-translate-x-1/2 lg:p-4 xl:w-3/4">
          <h2 className="cursor-pointer font-semibold text-purple-400 text-pastel-dark" onClick={() => router.push("/")}>
            EXPERT:MATCHER
          </h2>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
