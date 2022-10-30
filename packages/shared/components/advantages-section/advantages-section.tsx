import React from "react";
import { useRouter } from "next/router";

// Components
import Button from "../button/button";

const AdvantagesSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-10 md:px-20 xl:px-48 mx-auto">
      <div className="flex flex-col lgflex-row items-center my-10 lg:my-16 xl:my-28">
        <h2 className="text-center leading-20 text-pastel-dark">Do it all with EXPERT MATCHER</h2>
        <h5 className="max-w-2xl text-center ">
          Bring your audience data, marketing channels, and insights together so
          you can reach your goals faster—all from a single platform.
        </h5>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center mb-16 lg:mb-40 lg:space-x-6">
        <div className="flex flex-col mx-auto lg:w-1/2 max-w-[500px]">
          <div className="flex flex-col items-center lg:items-start w-full mx-auto">
            <h3>Get your project online</h3>
            <h6 className="text-center lg:text-left">
              Give your project more visibility by putting it online on the
              platform. You can then share it on social media and answer
              applicants.
            </h6>
            <div className="mt-6">
              <Button
                text="Sign up free"
                color="bg-blue-ocean"
                hover="bg-blue-800"
                textColor="text-white"
                borderColor="border-blue-ocean"
                action={() => router.push("/signup")}
              />
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mx-auto flex relative my-10 lg:my-0">
          <img
            className="w-[500px] h-auto rounded-xl object-cover"
            src="/images/doItAllImg1.png"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center mb-20 lg:mb-40 lg:space-x-6">
        <div className="flex flex-col mx-auto lg:w-1/2 max-w-[500px]">
          <div className="flex flex-col items-center lg:items-start w-full mx-auto">
            <h3 className="text-center lg:text-left">Create the perfect announce</h3>
            <h6 className="text-center lg:text-left">
              Create a detailled announce for your project. Description,
              technologies needed, pictures, attachments. You can customize your
              announce to make it stand out and make other expert apply.
            </h6>
            <div className="mt-6">
              <Button
                text="Check our guide"
                color="bg-transparent"
                textColor="text-blue-ocean"
                hover="text-blue-800"
                borderColor="border-blue-ocean"
                action={() => router.push("/signup")}
              />
            </div>
          </div>{" "}
        </div>

        <div className="lg:w-1/2 mx-auto flex relative my-10 lg:my-0">
          <img
            className="w-[500px] h-auto rounded-xl object-cover"
            src="/images/doItAllImg2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
