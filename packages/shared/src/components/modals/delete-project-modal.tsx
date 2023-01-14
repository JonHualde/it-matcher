import { useRef } from "react";
import Link from "next/link";
import { toast, Zoom } from "react-toastify";
import { useSWRConfig } from "swr";
// Components
import Toast from "../toast/toast";
// Types
import { ProjectTypes } from "@shared-types";
// utils
import { notify, updateToast } from "@shared-utils";

interface ModalProps {
  close: () => void;
  delete: (project: ProjectTypes) => void;
  title: string;
  subtitle?: string;
  linkText?: string;
  link?: string;
  project: ProjectTypes;
}

const DeleteProjectModal = (props: ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block">
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity" aria-hidden="true" onClick={props.close}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="relative inline-block max-w-md transform overflow-hidden rounded-lg bg-white py-8 text-left align-bottom
                shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-5 right-5 h-10 w-10 cursor-pointer text-blue-dimmed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={props.close}
          >
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <div className="w-full bg-white px-8">
            <div className="flex w-full flex-col">
              <div className="mb-6">
                <h3 className="text-3xl font-medium leading-6 text-blue-ocean" id="modal-title">
                  {props.title}
                </h3>
                <div className="mt-2 mb-3">
                  <p className="text-base text-gray-500">
                    {props.subtitle && props.subtitle}{" "}
                    {props.link ? (
                      <Link href={props.link}>
                        <a className="text-link-color ml-1 underline">{props.linkText}</a>
                      </Link>
                    ) : null}
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={props.close}
                    type="button"
                    className="mt-4 flex w-full justify-center rounded-sm bg-status-green py-3 font-medium text-white hover:bg-blue-800"
                  >
                    No, go back
                  </button>{" "}
                  <button
                    onClick={() => props.delete(props.project)}
                    type="button"
                    className="mt-4 flex w-full justify-center rounded-sm bg-status-red py-3 font-medium text-white hover:bg-blue-800"
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
