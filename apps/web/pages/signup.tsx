import SignUpForm from "shared/components/forms/sign-up-form";
import { useRouter } from "next/router";

// Layout
import AuthLayout from "shared/components/layouts/auth-layout";

const SignUp = () => {
  const router = useRouter();

  return (
    <AuthLayout imgSrc="/images/sign-up.png">
      <div className="w-full flex flex-col justify-between p-4 break-words">
        <div className="py-6 px-8">
          <h2 className="text-pastel-dark font-semibold text-purple-400 cursor-pointer" onClick={() => router.push("/")}>
            EXPERT:MATCHER
          </h2>
          <SignUpForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
