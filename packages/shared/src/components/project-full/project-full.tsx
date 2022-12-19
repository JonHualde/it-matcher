import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

// Store
import { useStoreActions, useStoreState } from "easy-peasy";

// Components
import Button from "../button/button";
import Modal from "../modals/logInModal";
import Toast from "../toast/toast";

const ProjectFull = () => {
  let shownProject = useStoreState((state: any) => state.shownProject);
  let isLoggedIn = useStoreState((state: any) => state.loggedIn);
  const myToast = useRef<any>();
  const [disabledButton, setDisabledButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateAuthStatus = useStoreActions(
    (actions: any) => actions.updateUserAuthStatus
  );

  const notify = () =>
    (myToast.current = toast(
      <Toast successMessage="Sending application request..." />,
      {
        autoClose: false,
        closeButton: false,
        type: toast.TYPE.INFO,
        transition: Zoom,
      }
    ));

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

      if (user === undefined)
        throw new Error("User is not logged in. Could not identify you.");

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

  useEffect(() => {
    let id = shownProject.id;

    const getUserToken = async () => {
      if (isLoggedIn && id) {
        const res = await fetch(
          `/api/application/get-applications?projectId=${id}`
        );
        const result = await res.json();

        console.log("result", result);

        if (result.error) {
          alert("Logout and login again.");
          updateAuthStatus(false);
          fetch("/api/auth/logout");
          return;
        }

        if (!result.canApply) {
          setDisabledButton(true);
          return;
        }
      }

      setDisabledButton(false);
    };

    getUserToken();
  }, [shownProject, isLoggedIn]);

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
      {!!Object.keys(shownProject).length && (
        <div
          className="col-span-3 border-2 border-gray-200 py-8 px-10 rounded-md shadow-xl relative"
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
          <div className="flex items-center relative mb-8">
            {/* Main Picture */}
            <div className="w-28 h-28 relative flex items-center">
              <img src="/images/login.png" alt="" className="rounded-md" />
            </div>

            {/* Title and general info */}
            <div className="flex flex-col pl-6 w-2/3">
              <h4 className="my-0 capitalize">{shownProject.projectName}</h4>
              <h4 className="my-0 capitalize">
                For {shownProject.projectName}
              </h4>
              <h6 className="mt-5 mb-0 capitalize">{shownProject.type}</h6>
            </div>

            {/* Apply / favourite */}
            <div className="flex absolute right-0 bottom-0">
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
                  action={() => sendApplication(shownProject)}
                />
                <div className="relative flex items-center pl-4">
                  <img src="/images/heart.png" alt="" className="rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-200 w-full absolute left-0"></div>

          <div className="flex flex-col mt-16">
            <div className="flex justify-between items-center border-b-2 border-gray-200 mb-6">
              <h4 className="text-muted font-sm text-lg mb-2">Posted</h4>
              <h4 className="text-muted font-sm text-lg mb-2">
                {new Date(shownProject.createdAt).getDate()} days ago
              </h4>
            </div>
            <div className="flex flex-col">
              <h5 className="mb-2">Description</h5>
              <p>{shownProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectFull;
