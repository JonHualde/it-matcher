// Components
import { Modal } from "@shared-components/modals";
import { Title } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
import { BsLinkedin } from "react-icons/bs";
// types
import { BasicUserDetails } from "@shared-types";

interface LogInModalProps {
  user: BasicUserDetails;
  close: () => void;
}

const ShowUserModal = (props: LogInModalProps) => {
  return (
    <Modal size="max-w-xl" close={() => props.close()}>
      <div className="relative h-auto max-h-[90vh] rounded-md">
        <div className="mb-8 flex flex-col items-center">
          {/* Main Picture */}
          <div className="relative my-4 flex h-80 h-40 w-40 items-center rounded-full">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
                props.user.profile_picture_ref ? "/" + props.user.profile_picture_ref : "/pictures/Generic-Profile-1600x1600.png"
              } `}
              alt="project_main_picture"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          {/* User's name and user details */}
          <div className="flex flex-col items-center pl-5">
            <Title type="h3" customClassName="my-0 capitalize">
              {props.user.first_name + " " + props.user.last_name}
            </Title>
            <Badge color="blue">Contat details</Badge>
          </div>
        </div>

        <div className="absolute left-0 w-full border border-gray-200"></div>

        {/* Social media links */}
        <div className="flex space-x-4">{props.user.linkedIn_url && <BsLinkedin size={30} />}</div>
      </div>
    </Modal>
  );
};

export default ShowUserModal;
