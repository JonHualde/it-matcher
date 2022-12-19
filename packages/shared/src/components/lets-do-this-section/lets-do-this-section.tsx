import { useRouter } from "next/router";
// Components
import Button from "../button/button";

const LetsDoThisSection = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full flex-col px-10 md:px-20 xl:px-48">
      <div className="mt-12 mb-8 flex flex-col items-center lg:mt-28 lg:mb-14">
        <h1>Let's do this</h1>
        <h5 className="max-w-2xl text-center">Every big idea starts with a small step forward.</h5>
      </div>

      <div className="mb-20 flex flex-col items-center justify-center md:flex-row lg:mb-40">
        <Button
          text="Sign up free"
          color="bg-blue-ocean"
          hover="bg-blue-800"
          textColor="text-white"
          borderColor="border-blue-ocean"
          action={() => router.push("/signup")}
        />
        <Button
          margin="mt-6 lg:mt-0"
          text="Compare plans"
          color="bg-transparent"
          hover="bg-transparent"
          textColor="text-blue-dimmed"
          borderColor="border-none"
          action={() => router.push("/login")}
        />
      </div>
    </div>
  );
};

export default LetsDoThisSection;
