import React from "react";
import { useRouter } from "next/router";

// Components
import Button from "../buttons/button";

const AdvantagesSection = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex flex-col px-10 md:px-20 xl:px-48">
      <div className="lgflex-row my-10 flex flex-col items-center lg:my-16 xl:my-28">
        <h2 className="leading-20 text-center text-pastel-dark">Do it all with EXPERT MATCHER</h2>
        <h5 className="max-w-2xl text-center ">
          Bring your audience data, marketing channels, and insights together so you can reach your goals faster—all from a single platform.
        </h5>
      </div>

      <div className="mb-16 flex flex-col-reverse items-center lg:mb-40 lg:flex-row lg:space-x-6">
        <div className="mx-auto flex max-w-[500px] flex-col lg:w-1/2">
          <div className="mx-auto flex w-full flex-col items-center lg:items-start">
            <h3>Get your project online</h3>
            <h6 className="text-center lg:text-left">
              Give your project more visibility by putting it online on the platform. You can then share it on social media and answer
              applicants.
            </h6>
            <div className="mt-6">
              <Button
                text="Sign up free"
                color="bg-blue-ocean"
                hover="bg-blue-800"
                textColor="text-white"
                border="border-2 border-blue-ocean"
                action={() => router.push("/signup")}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto my-10 flex lg:my-0 lg:w-1/2">
          <img className="h-auto w-[500px] rounded-xl object-cover" src="/images/advantages-1.png" alt="" />
        </div>
      </div>

      <div className="mb-20 flex flex-col-reverse items-center lg:mb-40 lg:flex-row lg:space-x-6">
        <div className="mx-auto flex max-w-[500px] flex-col lg:w-1/2">
          <div className="mx-auto flex w-full flex-col items-center lg:items-start">
            <h3 className="text-center lg:text-left">Create the perfect announce</h3>
            <h6 className="text-center lg:text-left">
              Create a detailled announce for your project. Description, technologies needed, pictures, attachments. You can customize your
              announce to make it stand out and make other expert apply.
            </h6>
            <div className="mt-6">
              <Button
                text="Check our guide"
                color="bg-transparent"
                textColor="text-blue-ocean"
                hover="text-blue-800"
                border="border-2 border-blue-ocean"
                action={() => router.push("/signup")}
              />
            </div>
          </div>{" "}
        </div>

        <div className="relative mx-auto my-10 flex lg:my-0 lg:w-1/2">
          <img className="h-auto w-[500px] rounded-xl object-cover" src="/images/advantages-2.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
