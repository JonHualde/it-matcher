import { useState, useRef } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
// Components
import { Modal, LogInModal } from "@shared-components/modals";
import { Button } from "@shared-components/button";
import Toast from "../toast/toast";
import { Date, Title, Paragraph } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
// types
import { ProjectProps } from "@shared-types";

interface LogInModalProps {
  close: () => void;
  selectedProject: ProjectProps;
  openLogInModal: () => void;
}

const ShowProjectModal = (props: LogInModalProps) => {
  let isLoggedIn = useStoreState((state: any) => state.user.isLoggedIn);
  const myToast = useRef<any>();
  const [disabledButton, setDisabledButton] = useState(false);

  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const notify = () =>
    (myToast.current = toast(<Toast successMessage="Sending application request..." />, {
      autoClose: false,
      closeButton: false,
      type: toast.TYPE.INFO,
      transition: Zoom,
    }));

  const dismiss = () => toast.dismiss(myToast.current);

  const sendApplication = async (shownProject: any) => {
    if (!isLoggedIn) {
      props.openLogInModal();
      return;
    }

    notify();

    try {
      let res = await fetch("/api/auth/getToken");
      let { user } = await res.json();

      if (user === undefined) throw new Error("User is not logged in. Could not identify you.");

      const status = ["Accepted", "Pending", "Rejected"];

      fetch("/api/application/send-application", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          status: status[Math.floor(Math.random() * 2) + 1],
          projectId: shownProject.id,
          applicantId: user.id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setDisabledButton(true);
          toast.update(myToast.current, {
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            render: "Your application has been sent correctly.",
          });
        });
    } catch (error: any) {
      toast.update(myToast.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render: error.message,
      });
    }
  };

  const getStatus = (isOnline: boolean) => {
    return isOnline ? <Badge color="green">Online</Badge> : <Badge color="red">Offline</Badge>;
  };

  return (
    <Modal size="max-w-4xl" close={() => props.close()}>
      <div className="relative rounded-md" style={{ height: "calc(100vh - 150px)" }}>
        <ToastContainer
          position="top-right"
          // autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
        />
        <div className="mb-8 flex flex-col items-center">
          {/* Main Picture */}
          <div className="relative my-4 flex h-80 w-full items-center">
            <img
              src={`${props.selectedProject?.projectPicture ?? "/images/login.png"} `}
              alt="project_main_picture"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          {/* Title and general info */}
          <div className="flex flex-col items-center pl-5">
            <Title type="h3" customClassName="my-0 capitalize">
              {props.selectedProject.projectName}
            </Title>
            <Paragraph customClassName="mt-4 capitalize">{getStatus(props.selectedProject.isOnline)}</Paragraph>
          </div>
        </div>

        <div className="absolute left-0 w-full border border-gray-200"></div>

        <div className="flex flex-col">
          <div className="mb-6 flex flex-col items-center justify-between border-b-2 border-gray-200">
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Creator</Paragraph>
              <Paragraph customClassName="capitalize font-semibold text-lg">{props.selectedProject.full_name}</Paragraph>
            </div>
            <div className="my-0 flex w-full items-center justify-between py-0">
              <Paragraph customClassName="py-1.5 font-sm text-md">Posted</Paragraph>
              <Date customClassName="font-semibold text-lg">{props.selectedProject.createdAt}</Date>
            </div>
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Type</Paragraph>
              <Paragraph customClassName="font-semibold text-lg capitalize">{props.selectedProject.type}</Paragraph>
            </div>
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Difficulty</Paragraph>
              <Paragraph customClassName="font-semibold text-lg capitalize">{props.selectedProject.difficulty}</Paragraph>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="mb-2">Description</h5>
            <p>{props.selectedProject?.description}</p>
          </div>
        </div>

        {/* Apply / favourite */}
        <div className="flex w-full items-center justify-center py-8">
          <Button
            text={!disabledButton ? "Apply" : "Application Sent"}
            color="bg-blue-ocean"
            textColor="text-white"
            hover="text-blue-800"
            rounded="rounded-md"
            padding="px-3 py-1"
            borderColor="border-blue-ocean"
            disabled={disabledButton}
            action={() => sendApplication(props.selectedProject)}
          />
          <div className="relative flex items-center pl-4">
            <img src="/images/heart.png" alt="" className="rounded-md" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowProjectModal;
