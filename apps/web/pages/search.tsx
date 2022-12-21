import { useEffect, useState } from "react";
// Components
import PublicPageLayout from "shared/src/components/layouts/public-page-layout";
import ListOfProjects from "shared/src/components/list-of-projects/list-of-projects";
import { ShowProjectModal, LogInModal } from "@shared-components/modals";
// Utils
import { fetchJSON } from "@shared-utils";
// types
import { ProjectProps } from "@shared-types";
// States
import { useStoreState } from "easy-peasy";

const Search = ({ pathname }: any) => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useStoreState((state: any) => state.user);

  const getProjectDetails = async (project: ProjectProps) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    setError(false);

    const getData = async () => {
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
    getData();
  }, [setProjects, setIsLoading]);

  return (
    <PublicPageLayout pathname={pathname}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Error</div>
          ) : (
            <>
              {isModalOpen && (
                <LogInModal
                  title={"Log in to apply to this offer"}
                  subtitle={"You do not have an account yet?"}
                  linkText={"Sign up"}
                  link={"/sign-up"}
                  close={() => setIsModalOpen(false)}
                  zIndex={40}
                />
              )}
              <div className="grid h-full grid-cols-4 gap-x-6 py-4 px-8">
                <ListOfProjects projects={projects} getProjectDetails={getProjectDetails} />
                {selectedProject && (
                  <ShowProjectModal
                    openLogInModal={() => setIsModalOpen(true)}
                    selectedProject={selectedProject}
                    close={() => setSelectedProject(null)}
                  />
                )}
              </div>
            </>
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
