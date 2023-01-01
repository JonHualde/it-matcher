import Image from "next/image";
// Components
import { Italic, DateTag, Paragraph, Title } from "@shared-components/typography";
import { Badge, Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Icon } from "@shared-components/icons";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
// types
import { ProjectTypes, JobTitlesWantedTypes, FavouritesTypes } from "@shared-types";

interface ListOfProjectTypes {
  projects: ProjectTypes[];
  job_titles_wanted: JobTitlesWantedTypes[];
  isUserLoggedIn: boolean;
  favourites: FavouritesTypes[];
  getProjectDetails: (project: ProjectTypes) => void;
  updateFavourites: (method: "POST" | "DELETE", project: ProjectTypes) => void;
}

const ListOfProjects = ({
  updateFavourites,
  favourites,
  isUserLoggedIn,
  projects,
  getProjectDetails,
  job_titles_wanted,
}: ListOfProjectTypes) => {
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
    <div className="grid h-full gap-8 overflow-y-auto p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project, index) => (
        <div
          key={project.project_name + "-" + index}
          className="relative flex cursor-pointer flex-col rounded-md border border-gray-200 pt-4 pb-7 transition-all duration-300 ease-in-out hover:translate-y-[-2px]
          hover:border-gray-300 hover:shadow-lg
          "
        >
          <div className="h-full px-4" onClick={() => getProjectDetails(project)}>
            {/* Project's picture */}
            <div className="flex justify-between">
              <div className="relative h-12 w-12">
                <Image
                  loading="lazy"
                  layout="fill"
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
                    project.project_main_picture ? "/" + project.project_main_picture : "/pictures/Generic-Profile-1600x1600.png"
                  } `}
                  alt="project_main_picture"
                  objectFit="cover"
                  className="rounded-full"
                />{" "}
              </div>
              <div className="flex flex-col items-end">
                <Italic customClassName="pl-2" color="blue-dimmed">
                  {project.full_name}
                </Italic>
                <DateTag customClassName="pl-2">{project.created_at}</DateTag>
              </div>
            </div>
            {/* Project's name */}
            <Title type="h5" customClassName="line-clamp-3 mb-0 mt-3">
              {project.project_name}
            </Title>
            {/* Info about the project */}
            <div className="text-md mt-0 md:text-lg">
              <>
                <span className="font-bold">Project type:</span> {project.type}
              </>
            </div>
            <div className="text-md md:text-lg">
              <>
                <span className="font-bold">Estimated duration:</span> {project.estimated_time_duration}
                {" " + project.estimated_time_duration_metric + "(s)"}
              </>
            </div>
            <div className="text-md md:text-lg">
              <div className="flex items-center">
                <span className="mr-1 font-bold">Starting on:</span> <DateTag>{project.starting_on}</DateTag>
              </div>
            </div>
            {/* Searching for */}
            <div className="mt-2">
              <Title type="h6" customClassName="line-clamp-3 mb-1 mt-0">
                Searching for:
              </Title>
              {!job_titles_wanted.length && <Loader />}
              {job_titles_wanted.map((job_titles_wanted: JobTitlesWantedTypes, index: number) => {
                return project.job_titles_wanted.map((item) => {
                  if (item === job_titles_wanted.id) {
                    return (
                      <Badge
                        key={job_titles_wanted.name + "-" + index}
                        color="blue"
                        customClassName="inline-flex text-xs font-medium m-0.5"
                      >
                        {job_titles_wanted.name}
                      </Badge>
                    );
                  }
                });
              })}
            </div>
          </div>
          {/* Project's status && favourites */}
          <div className="absolute bottom-0 right-0 flex items-center gap-x-2">
            {isUserLoggedIn && (
              <div className="flex items-center gap-x-1">
                {favourites.find((fav) => fav.project_id === project.id) ? (
                  <AiFillStar className="text-yellow-400" onClick={() => updateFavourites("DELETE", project)} />
                ) : (
                  <AiOutlineStar className="text-gray-400" onClick={() => updateFavourites("POST", project)} />
                )}
              </div>
            )}
            <Badge color={project.is_online ? "green" : "red"} customClassName="text-[11px] font-medium px-2">
              {project.is_online ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfProjects;
