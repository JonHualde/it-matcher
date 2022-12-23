import Image from "next/image";
// store
import { useStoreActions } from "easy-peasy";
// Components
import { Italic, Date, Paragraph, Title } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
// types
import { ProjectProps, JobTitlesTypes } from "@shared-types";

interface ListOfProjectProps {
  projects: ProjectProps[];
  jobTitles: JobTitlesTypes[];
  getProjectDetails: (project: ProjectProps) => void;
}

const ListOfProjects = ({ projects, getProjectDetails, jobTitles }: ListOfProjectProps) => {
  const updateProject = useStoreActions((actions: any) => actions.updateProject);

  return (
    <div className="grid gap-8 overflow-y-auto p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" style={{ height: "calc(100vh - 150px)" }}>
      {projects.map((project, index) => (
        <div
          key={project.projectName + "-" + index}
          onClick={() => getProjectDetails(project)}
          className="relative flex cursor-pointer flex-col rounded-md border border-gray-200 p-4 shadow-xl transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:scale-105
         hover:border-gray-300 hover:shadow-2xl
          "
        >
          <div className="flex justify-between">
            <div className="relative h-12 w-14">
              <Image
                loading="lazy"
                layout="fill"
                src={`${project.projectPicture && project.projectPicture.includes("http") ? project.projectPicture : "/images/login.png"} `}
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
          <Title type="h5" customClassName="line-clamp-3 mb-0 mt-3">
            {project.projectName}
          </Title>
          <Paragraph customClassName="mt-0">{project.type}</Paragraph>
          <Paragraph>
            <>
              <span className="font-bold">Estimated duration:</span> {project.estimatedTimeDuration}
              {" " + project.estimatedTimeDurationMetric + "(s)"}
            </>
          </Paragraph>
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
        </div>
      ))}
    </div>
  );
};

export default ListOfProjects;
