import { useState, useRef } from "react";
import Image from "next/image";
// Components
import { Modal } from "@shared-components/modals";
import { Title, Paragraph } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
import { BsLinkedin, BsInstagram, BsGithub, BsCheck2 } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { SiNotion } from "react-icons/si";
import { BiCopy } from "react-icons/bi";
// types
import { BasicUserDetails } from "@shared-types";
// utils
import { notify } from "@shared-utils";

interface LogInModalProps {
  user: BasicUserDetails;
  close: () => void;
}

const ShowUserModal = (props: LogInModalProps) => {
  const myToast = useRef(null);
  const [copied, setCopied] = useState(false);
  return (
    <Modal size="max-w-xl" close={() => props.close()}>
      <div className="relative h-auto max-h-[90vh] rounded-md">
        <div className="flex flex-col items-center">
          {/* Main Picture */}
          <div className="relative my-4 flex h-80 h-40 w-40 items-center rounded-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
                props.user.profile_picture_ref ? "/" + props.user.profile_picture_ref : "/pictures/Generic-Profile-1600x1600.png"
              } `}
              alt="project_main_picture"
              className="h-full w-full rounded-md"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* User's name and user details */}
          <div className="flex flex-col items-center">
            <Title type="h3" customClassName="my-0 capitalize">
              {props.user.first_name + " " + props.user.last_name}
            </Title>
            <div className="my-0 flex cursor-pointer items-center ">
              <Paragraph
                customClassName="text-blue-600 underline"
                click={() => {
                  window.open(`mailto:${props.user.email}`);
                }}
              >
                {props.user.email}
              </Paragraph>
              <div className="pl-4">
                {copied ? (
                  <BsCheck2 size={20} />
                ) : (
                  <BiCopy
                    size={20}
                    onClick={() => {
                      notify({ myToast, message: "Email address copied to clipboard", autoClose: 1000 });
                      setTimeout(() => {
                        setCopied(false);
                      }, 1500);

                      setCopied(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 w-full border border-gray-200"></div>
        <div className="flex flex-col items-center">
          <Badge color="blue">{props.user.first_name + "'s socials"}</Badge>
          {/* Social media links */}
          <div className="mt-8 flex space-x-8">
            {props.user.linkedIn_url && (
              <BsLinkedin
                size={40}
                onClick={() => window.open(props.user.linkedIn_url, "_blank")}
                className="transform cursor-pointer duration-200 ease-in hover:scale-110 hover:text-pastel-dark "
              />
            )}
            {props.user.instagram_username && (
              <BsInstagram
                onClick={() => window.open(`https://www.instagram.com/${props.user.instagram_username}`, "_blank")}
                size={40}
                className="transform cursor-pointer duration-200 ease-in hover:scale-110 hover:text-pastel-dark "
              />
            )}
            {props.user.website_url && (
              <CgWebsite
                size={40}
                onClick={() => window.open(props.user.website_url, "_blank")}
                className="transform cursor-pointer duration-200 ease-in hover:scale-110 hover:text-pastel-dark "
              />
            )}
            {props.user.github_url && (
              <BsGithub
                size={40}
                onClick={() => window.open(props.user.github_url, "_blank")}
                className="transform cursor-pointer duration-200 ease-in hover:scale-110 hover:text-pastel-dark "
              />
            )}
            {props.user.notion_page_url && (
              <SiNotion
                size={40}
                onClick={() => window.open(props.user.notion_page_url, "_blank")}
                className="transform cursor-pointer duration-200 ease-in hover:scale-110 hover:text-pastel-dark "
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUserModal;
