// Components
import Cross from "components/icons/cross";
import Button from "../button/button";
// type
import { ProjectProps } from "@types";
import UpdateProjectForm from "components/forms/update-project-form";

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
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 transition-opacity" aria-hidden="true" onClick={props.close}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-7xl sm:w-full py-6">
          <div className="bg-white w-full">
            <div className="flex flex-col w-full relative">
              {/* HEADER */}
              <div className="pb-6 mt-3 border-b border-gray-400 w-full px-8">
                <Cross close={props.close} />
                <h3 className="text-3xl py-0 my-0 font-medium text-blue-dimmed" id="modal-title">
                  {" "}
                  Edit Project{" "}
                </h3>
              </div>

              <UpdateProjectForm />

              {/* FOOTER */}
              <div className="pt-6 mt-3 border-t border-gray-400 w-full px-8">
                <div className="w-full flex items-center justify-end">
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
