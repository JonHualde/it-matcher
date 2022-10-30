import { useRouter } from "next/router";
import LoginForm from "shared/components/forms/login-form";

// Layout
import AuthLayout from "shared/components/layouts/auth-layout";

const Login = () => {
  const router = useRouter();

  return (
    <AuthLayout imgSrc="/images/login.png">
      <div className="w-full flex flex-col justify-between p-4 break-words">
        <div className="py-6 px-8">
          <h2 className="text-pastel-dark font-semibold text-purple-400 cursor-pointer" onClick={() => router.push("/")}>
            EXPERT:MATCHER
          </h2>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
