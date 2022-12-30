// Components
import Cross from "@shared-components/icons/cross";
import Button from "../buttons/button";
// type
import { ProjectProps } from "@types";
import UpdateProjectForm from "@shared-components/forms/update-project-form";

interface ModalProps {
  close: () => void;
  save: (projectData: ProjectProps) => void;
  linkText?: string;
  link?: string;
  projectId: number;
  setProjects: any;
  projects: Array<object>;
}

const EditProjectModal = (props: ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block">
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity" aria-hidden="true" onClick={props.close}></div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block max-w-7xl transform overflow-hidden rounded-lg bg-white py-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle">
          <div className="w-full bg-white">
            <div className="relative flex w-full flex-col">
              {/* HEADER */}
              <div className="mt-3 w-full border-b border-gray-400 px-8 pb-6">
                <Cross close={props.close} />
                <h3 className="my-0 py-0 text-3xl font-medium text-blue-dimmed" id="modal-title">
                  {" "}
                  Edit Project{" "}
                </h3>
              </div>

              <UpdateProjectForm />

              {/* FOOTER */}
              <div className="mt-3 w-full border-t border-gray-400 px-8 pt-6">
                <div className="flex w-full items-center justify-end">
                  <Button
                    text="CLOSE"
                    color="bg-transparent"
                    textColor="text-blue-ocean"
                    hover="text-blue-800"
                    borderColor="border-blue-ocean"
                    action={() => props.close()}
                  />
                  <Button
                    text="SAVE"
                    color="bg-blue-ocean"
                    hover="bg-blue-800"
                    textColor="text-white"
                    margin="ml-4 "
                    borderColor="border-blue-ocean"
                    action={() => props.save()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
