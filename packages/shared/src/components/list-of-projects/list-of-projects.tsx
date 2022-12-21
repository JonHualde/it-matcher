import Image from "next/image";
// store
import { useStoreActions } from "easy-peasy";
// Components
import Button from "../button/button";
import { Italic, Date } from "@shared-components/typography";
// types
import { ProjectProps } from "@shared-types";

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
          className="relative flex cursor-pointer flex-col rounded-md border border-gray-200 p-4 shadow-xl transition-all hover:px-2"
        >
          <div className="flex justify-between">
            <div className="relative h-12 w-14">
              <Image
                loading="lazy"
                layout="fill"
                src={`${project.projectPicture ?? "/images/login.png"} `}
                alt="project_main_picture"
                objectFit="cover"
                className="rounded-md"
              />{" "}
            </div>
            <div className="flex flex-col items-end">
              <Italic customClassName="pl-2" color="blue-dimmed">
                {project.full_name}
              </Italic>
              <Date customClassName="pl-2">{project.createdAt}</Date>
            </div>
          </div>
          <h5 className="line-clamp-3 mb-0 mt-3">{project.projectName}</h5>
          <p className="mt-0 mb-6">{project.type}</p>
          <div className="flex items-end">
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
