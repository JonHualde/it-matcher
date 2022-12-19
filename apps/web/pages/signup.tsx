import SignUpForm from "shared/src/components/forms/sign-up-form";
import { useRouter } from "next/router";

// Layout
import AuthLayout from "shared/src/components/layouts/auth-layout";

const SignUp = () => {
  const router = useRouter();

  return (
    <AuthLayout imgSrc="/images/sign-up.png">
      <div className="flex w-full flex-col justify-between break-words p-4">
        <div className="py-6 px-8">
          <h2 className="text-purple-400 cursor-pointer font-semibold text-pastel-dark" onClick={() => router.push("/")}>
            EXPERT:MATCHER
          </h2>
          <SignUpForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
