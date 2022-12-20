import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
// Store
import { useStoreActions, useStoreState } from "easy-peasy";
// Components
import Button from "../button/button";
import Modal from "../modals/logInModal";
import Toast from "../toast/toast";
// types
import { ProjectProps } from "@shared-types";
// Utils
import { getDate } from "@shared-utils";

interface ShowProjectProps {
  selectedProject: ProjectProps | null;
}

const ShowProject = ({ selectedProject }: ShowProjectProps) => {
  let isLoggedIn = useStoreState((state: any) => state.loggedIn);
  const myToast = useRef<any>();
  const [disabledButton, setDisabledButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
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

  return (
    <>
      {isModalOpen && (
        <Modal
          title={"Log in to apply to this offer"}
          subtitle={"You do not have an account yet?"}
          linkText={"Sign up"}
          link={"/sign-up"}
          isOpen={isModalOpen}
          close={() => setIsModalOpen(false)}
        />
      )}
      {selectedProject && (
        <div
          className="relative col-span-3 rounded-md border-2 border-gray-200 py-8 px-10 shadow-xl"
          style={{ height: "calc(100vh - 150px)" }}
        >
          <ToastContainer
            position="top-right"
            // autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
          />
          <div className="relative mb-8 flex items-center">
            {/* Main Picture */}
            <div className="relative flex h-28 w-28 items-center">
              <img src="/images/login.png" alt="" className="rounded-md" />
            </div>

            {/* Title and general info */}
            <div className="flex w-2/3 flex-col pl-6">
              <h4 className="my-0 capitalize">{selectedProject?.full_name}</h4>
              <h4 className="my-0 capitalize">For {selectedProject?.projectName}</h4>
              <h6 className="mt-5 mb-0 capitalize">{selectedProject?.type}</h6>
            </div>

            {/* Apply / favourite */}
            <div className="absolute right-0 bottom-0 flex">
              <div className="flex items-center">
                <Button
                  text={!disabledButton ? "Apply" : "Application Sent"}
                  color="bg-blue-ocean"
                  textColor="text-white"
                  hover="text-blue-800"
                  rounded="rounded-md"
                  padding="px-3 py-1"
                  borderColor="border-blue-ocean"
                  disabled={disabledButton}
                  action={() => sendApplication(selectedProject)}
                />
                <div className="relative flex items-center pl-4">
                  <img src="/images/heart.png" alt="" className="rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 w-full border-2 border-gray-200"></div>

          <div className="mt-16 flex flex-col">
            <div className="mb-6 flex items-center justify-between border-b-2 border-gray-200">
              <h4 className="text-muted font-sm mb-2 text-lg">Posted</h4>
              <h4 className="text-muted font-sm mb-2 text-lg">{getDate(selectedProject?.createdAt)}</h4>
            </div>
            <div className="flex flex-col">
              <h5 className="mb-2">Description</h5>
              <p>{selectedProject?.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProject;
