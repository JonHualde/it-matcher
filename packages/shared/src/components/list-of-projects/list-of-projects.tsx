// store
import { useStoreActions, useStoreState } from "easy-peasy";
// Components
import Button from "../button/button";
// types
import { ProjectProps } from "@shared-types";
// Utils
import { getDate } from "@shared-utils";

interface ListOfProjectProps {
  projects: ProjectProps[];
  getProjectDetails: (project: ProjectProps) => void;
}

const ListOfProjects = ({ projects, getProjectDetails }: ListOfProjectProps) => {
  const updateProject = useStoreActions((actions: any) => actions.updateProject);

  return (
    <div className="col-span-1 grid grid-cols-1 gap-y-8 overflow-y-auto" style={{ height: "calc(100vh - 150px)" }}>
      {projects.map((project, index) => (
        <div
          key={project.projectName + "-" + index}
          onClick={() => getProjectDetails(project)}
          className="relative flex cursor-pointer flex-col rounded-md border border-gray-200 p-4 shadow-xl transition-all hover:px-3"
        >
          <div className="relative flex h-12 w-12 items-center">
            <img src="/images/login.png" alt="" className="rounded-md" />
          </div>
          <h5 className="mb-0 mt-3">{project.projectName}</h5>
          <p className="mt-0 mb-6">{project.type}</p>
          <div className="flex items-end justify-between">
            <p>{getDate(project.createdAt)}</p>
            <Button
              text="Details"
              color="bg-blue-ocean"
              textColor="text-white"
              hover="text-blue-800"
              rounded="rounded-md"
              padding="px-3 py-1"
              borderColor="border-blue-ocean"
              action={() => () => updateProject(project)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfProjects;
