import React from "react";
import { useRouter } from "next/router";
import { FaRocket, FaConnectdevelop } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";

const KickStartSection = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full flex-col bg-pastel-light px-10 md:px-20 xl:px-48">
      <div className="my-12 flex flex-col items-center lg:my-28">
        <h2 className="text-center text-pastel-dark">Kick start with project</h2>
        <h5 className="max-w-2xl text-center">Our marketing platform helps brands like these build their thing and keep it growing.</h5>
      </div>

      <div className="mb-20 flex items-center justify-center lg:mb-40">
        <div className="grid grid-cols-1 justify-center gap-x-6 lg:grid-cols-3">
          <div className="mb-16 flex flex-col items-center lg:mb-0">
            <FaRocket size={60} />
            <h3 className="mt-10 text-pastel-dark">Launch</h3>
            <p className="mt-4 w-3/4 text-center text-lg">85% of IT:MATCHER project have been launched in the last 6 months.</p>
          </div>

          <div className="mb-16 flex flex-col items-center lg:mb-0">
            <FaConnectdevelop size={60} />
            <h3 className="mt-10 text-pastel-dark">Connection</h3>
            <p className="mt-4 w-3/4 text-center text-lg">We have helped more than 1000 IT workers to find their project’s partners.</p>
          </div>

          <div className="flex flex-col items-center">
            <BsFillChatDotsFill size={60} />
            <h3 className="mt-10 text-pastel-dark">Chats</h3>
            <p className="mt-4 w-3/4 text-center text-lg">Connect and chat safely with the right people.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickStartSection;
