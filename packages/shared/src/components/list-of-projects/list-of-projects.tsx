import Image from "next/image";
// store
import { useStoreActions } from "easy-peasy";
// Components
import { Italic, Date, Paragraph, Title } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Icon } from "@shared-components/icons";
// types
import { ProjectProps, JobTitlesTypes } from "@shared-types";

interface ListOfProjectProps {
  projects: ProjectProps[];
  jobTitles: JobTitlesTypes[];
  getProjectDetails: (project: ProjectProps) => void;
}

const ListOfProjects = ({ projects, getProjectDetails, jobTitles }: ListOfProjectProps) => {
  const updateProject = useStoreActions((actions: any) => actions.updateProject);

  if (!projects.length) {
    return (
      <Box border="border-2 border-blue-ocean">
        <div className="flex items-center">
          <Icon type="info" size="small" />
          <Paragraph customClassName="text-blue-ocean ml-4">No projects found</Paragraph>
        </div>
      </Box>
    );
  }

  return (
    <div className="grid gap-8 overflow-y-auto p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" style={{ height: "calc(100vh - 150px)" }}>
      {projects.map((project, index) => (
        <div
          key={project.projectName + "-" + index}
          onClick={() => getProjectDetails(project)}
          className="relative flex max-h-[400px] cursor-pointer flex-col rounded-md border border-gray-200 px-4 pt-4 pb-7 transition-all duration-300 ease-in-out hover:translate-y-[-2px]
         hover:scale-105 hover:border-gray-300 hover:shadow-lg
          "
        >
          {/* Project's picture */}
          <div className="flex justify-between">
            <div className="relative h-12 w-12">
              <Image
                loading="lazy"
                layout="fill"
                src={`${project.projectPicture && project.projectPicture.includes("http") ? project.projectPicture : "/images/login.png"} `}
                alt="project_main_picture"
                objectFit="cover"
                className="rounded-full"
              />{" "}
            </div>
            <div className="flex flex-col items-end">
              <Italic customClassName="pl-2" color="blue-dimmed">
                {project.full_name}
              </Italic>
              <Date customClassName="pl-2">{project.createdAt}</Date>
            </div>
          </div>

          {/* Project's name */}
          <Title type="h5" customClassName="line-clamp-3 mb-0 mt-3">
            {project.projectName}
          </Title>

          {/* Info about the project */}
          <Paragraph customClassName="mt-0">
            <>
              <span className="font-bold">Project type:</span> {project.type}
            </>
          </Paragraph>
          <Paragraph>
            <>
              <span className="font-bold">Estimated duration:</span> {project.estimatedTimeDuration}
              {" " + project.estimatedTimeDurationMetric + "(s)"}
            </>
          </Paragraph>
          <Paragraph>
            <div className="flex items-center">
              <span className="mr-1 font-bold">Starting on:</span> <Date>{project.startingOn}</Date>
            </div>
          </Paragraph>

          {/* Searching for */}
          <div className="mt-2">
            <Title type="h6" customClassName="line-clamp-3 mb-1 mt-0">
              Searching for:
            </Title>
            {jobTitles.map((jobTitle, index) => {
              return project.jobTitle.map((item) => {
                if (item === jobTitle.id) {
                  return (
                    <Badge key={jobTitle.name + "-" + index} color="blue" customClassName="inline-flex text-xs font-medium m-0.5">
                      {jobTitle.name}
                    </Badge>
                  );
                }
              });
            })}
          </div>

          {/* Project's status */}
          <div className="absolute bottom-0 right-0">
            <Badge color={project.isOnline ? "green" : "red"} customClassName="text-[11px] font-medium px-2">
              {project.isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfProjects;
