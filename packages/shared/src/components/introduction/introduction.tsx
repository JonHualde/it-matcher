import { useRouter } from "next/router";
// Components
import Button from "../buttons/button";

const Introduction = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse items-center bg-pastel-light py-16 px-10 md:px-20 lg:flex-row lg:py-20 xl:py-32 xl:px-48">
      <div className="mt-12 flex max-w-[650px] flex-col lg:mt-0 lg:w-1/2">
        <h2 className="text-pastel-dark">Find the right partners to build unique projects together</h2>
        <h6>
          Struggling to find talents to build and complete your projects? We have all been there.Design, Interfaces, Databases,
          Infrastructures... There are too many tools and technologies to master in order to create your dream startup.
        </h6>
        <h6>
          That’s why IT:Matcher is here. We are going to give you a hand to find the perfect partners so you can build your project from
          scratch to the moon the right way.
        </h6>
        <div className="mt-6 flex items-center justify-center lg:justify-start">
          <Button
            text="Sign up free"
            color="bg-blue-ocean"
            hover="bg-blue-800"
            textColor="text-white"
            borderColor="border-blue-ocean"
            action={() => router.push("/signup")}
          />
          <Button
            text="Compare plans"
            color="bg-transparent"
            hover="bg-transparent"
            textColor="text-blue-dimmed"
            borderColor="border-none"
            action={() => router.push("/login")}
          />
        </div>
      </div>
      <div className="relative flex items-center justify-center lg:w-1/2">
        <img className="h-auto w-4/5 rounded-full" src="/images/intro.png" alt="" />
      </div>
    </div>
  );
};

export default Introduction;
