import React from "react";
import { useRouter } from "next/router";

const KickStartSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-10 md:px-20 xl:px-48 mx-auto bg-pastel-light w-full">
      <div className="flex flex-col items-center my-12 lg:my-28">
        <h2 className="text-pastel-dark text-center">Kick start with project</h2>
        <h5 className="max-w-2xl text-center">
          Our marketing platform helps brands like these build their thing and
          keep it growing.
        </h5>
      </div>

      <div className="flex items-center mb-20 lg:mb-40 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 justify-center">
          <div className="flex flex-col items-center mb-16 lg:mb-0">
            <img
              src="/icons/rocket-icon.png"
              className="w-24 h-24 mb-4"
              alt="rocket"
            />
            <h3 className="text-pastel-dark">Launch</h3>
            <p className="w-3/4 text-center mt-4 text-lg">
              85% of IT:MATCHER project have been launched in the last 6 months.
            </p>
          </div>

          <div className="flex flex-col items-center mb-16 lg:mb-0">
            <img
              src="/icons/git-icon.png"
              className="w-24 h-24 mb-4"
              alt="rocket"
            />
            <h3 className="text-pastel-dark">Connection</h3>
            <p className="w-3/4 text-center mt-4 text-lg">
              We have helped more than 1000 IT workers to find their project’s
              partners.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/icons/chat-icon.png"
              className="w-24 h-24 mb-4"
              alt="rocket"
            />
            <h3 className="text-pastel-dark">Chats</h3>
            <p className="w-3/4 text-center mt-4 text-lg">
              Connect and chat safely with the right people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickStartSection;
