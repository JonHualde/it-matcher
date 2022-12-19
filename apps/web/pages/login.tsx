import { useRouter } from "next/router";
import LoginForm from "@shared-components/forms/login-form";

// Layout
import AuthLayout from "shared/src/components/layouts/auth-layout";

const Login = () => {
  const router = useRouter();

  return (
    <AuthLayout imgSrc="/images/login.png">
      <div className="flex w-full flex-col justify-between break-words p-4">
        <div className="py-6 px-8">
          <h2 className="text-purple-400 cursor-pointer font-semibold text-pastel-dark" onClick={() => router.push("/")}>
            EXPERT:MATCHER
          </h2>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
