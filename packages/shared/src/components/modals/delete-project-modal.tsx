import { useRef } from "react";
import Link from "next/link";
import { toast, Zoom } from "react-toastify";
import { useSWRConfig } from 'swr'

// Components
import Toast from "../toast/toast";

interface ModalProps {
  close: () => void;
  title: string;
  subtitle?: string;
  linkText?: string;
  link?: string;
  projectId: number;
  setProjects: any;
  projects: Array<object>
}

const DeleteProjectModal = (props: ModalProps) => {
  const myToast = useRef<any>();
  const { mutate } = useSWRConfig()

  const notify = () =>
    (myToast.current = toast(
      <Toast successMessage="Deleting your project..." />,
      {
        autoClose: false,
        closeButton: false,
        type: toast.TYPE.INFO,
        transition: Zoom,
      }
    ));

  const deleteProject = () => {
    notify();

    fetch("/api/project/delete-project", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        projectId: props.projectId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) throw new Error(result.errorMessage);

        // After deleting the row in the DB, we remove it from the current projects list
        const newArray = props.projects.filter((project: any) => project.id !== props.projectId)
        props.setProjects(() => newArray);

        mutate("/project/get-user-projects")

        toast.update(myToast.current, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: "Your project has been successfully deleted",
        });
        props.close();
      })
      .catch(async (err) => {
        console.error(err);
        toast.update(myToast.current, {
          type: toast.TYPE.ERROR,
          autoClose: 5000,
          render: err.message,
        });
      });
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity"
          aria-hidden="true"
          onClick={props.close}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle max-w-md sm:w-full py-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 absolute top-5 right-5 text-blue-dimmed cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={props.close}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="bg-white px-8 w-full">
            <div className="flex flex-col w-full">
              <div className="mb-6">
                <h3
                  className="text-3xl leading-6 font-medium text-blue-ocean"
                  id="modal-title"
                >
                  {props.title}
                </h3>
                <div className="mt-2 mb-3">
                  <p className="text-base text-gray-500">
                    {props.subtitle && props.subtitle}{" "}
                    {props.link ? (
                      <Link href={props.link}>
                        <a className="ml-1 text-link-color underline">
                          {props.linkText}
                        </a>
                      </Link>
                    ) : null}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={props.close}
                    type="button"
                    className="w-full bg-status-green py-3 rounded-sm flex justify-center text-white font-medium hover:bg-blue-800 mt-4"
                  >
                    No, go back
                  </button>{" "}
                  <button
                    onClick={deleteProject}
                    type="button"
                    className="w-full bg-status-red py-3 rounded-sm flex justify-center text-white font-medium hover:bg-blue-800 mt-4"
                  >
                    Yes, delete it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
