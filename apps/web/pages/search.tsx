import { useEffect, useState } from "react";
// Components
import PublicPageLayout from "shared/src/components/layouts/public-page-layout";
import ListOfProjects from "shared/src/components/list-of-projects/list-of-projects";
import { ShowProjectModal, LogInModal } from "@shared-components/modals";
import { Loader } from "@shared-components/status";
import { Paragraph } from "@shared-components/typography";
import { Box } from "@shared-components/box";
import { ErrorMessage } from "@shared-components/error-message";
import { Icon } from "@shared-components/icons";
// Utils
import { fetchJSON } from "@shared-utils";
// types
import { ProjectProps, JobTitlesTypes } from "@shared-types";
// States
import { useStoreState } from "easy-peasy";
import { SearchBar } from "components/search";

const Search = ({ pathname }: any) => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitlesTypes[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useStoreState((state: any) => state.user);

  const getProjectDetails = async (project: ProjectProps) => {
    setSelectedProject(project);
  };

  const getJobTitlesList = async () => {
    await fetchJSON("job-titles", "GET")
      .then((jobTitles: JobTitlesTypes[]) => {
        setJobTitles(() => jobTitles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProjects = async () => {
    setError(false);

    await fetchJSON("project/all", "GET")
      .then(async (projects: ProjectProps[]) => {
        if (!user.isLoggedIn) {
          setProjects(() => projects);
        } else {
          setProjects(() => projects.filter((item: ProjectProps) => item.userId !== user.id));
        }

        setIsLoading(false);
        return;
      })
      .catch((err) => {
        console.error("HEYYY", err);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getJobTitlesList();
    getProjects();
  }, [setProjects, setIsLoading]);

  return (
    <PublicPageLayout pathname={pathname}>
      {isLoading && (
        <Box>
          <>
            <Paragraph customClassName="flex items-center m-0 p-0 text-blue-dimmed italic text-xl font-semibold mb-4">
              Loading projects
            </Paragraph>
            <Loader size={10} />
          </>
        </Box>
      )}

      {error && (
        <Box border="border border-red-600">
          <>
            <Paragraph customClassName="flex items-center m-0 p-0 italic text-xl font-semibold mb-4 text-red-600">
              There was an error loading the projects. Please reload the page.
            </Paragraph>
            <Icon type="error" />
          </>
        </Box>
      )}

      {!error && !isLoading && (
        <>
          {isModalOpen && (
            <LogInModal
              title={"Log in to apply to this offer"}
              subtitle={"You do not have an account yet?"}
              linkText={"Sign up"}
              link={"/sign-up"}
              close={() => setIsModalOpen(false)}
              zIndex="z-30"
            />
          )}
          <SearchBar jobTitles={jobTitles} />
          <ListOfProjects jobTitles={jobTitles} projects={projects} getProjectDetails={getProjectDetails} />
          {selectedProject && (
            <ShowProjectModal
              openLogInModal={() => setIsModalOpen(true)}
              selectedProject={selectedProject}
              close={() => setSelectedProject(null)}
            />
          )}
        </>
      )}
    </PublicPageLayout>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      pathname: context.resolvedUrl,
    },
  };
}

export default Search;
