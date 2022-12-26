import { useEffect, useState, useRef } from "react";
// Components
import PublicPageLayout from "shared/src/components/layouts/public-page-layout";
import ListOfProjects from "shared/src/components/list-of-projects/list-of-projects";
import { ShowProjectModal, LogInModal } from "@shared-components/modals";
import { Loader } from "@shared-components/status";
import { Paragraph } from "@shared-components/typography";
import { Box } from "@shared-components/box";
import { SearchBar, MobileSearch } from "components/search";
import { Icon } from "@shared-components/icons";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";
// types
import { ProjectProps, JobTitlesTypes, SearchBarFiltersTypes, FavouritesTypes } from "@shared-types";
// States
import { useStoreState } from "easy-peasy";

const projects = [
  {
    id: 5,
    createdAt: "2022-12-20T16:16:54.435Z",
    updatedAt: "2022-12-20T16:16:54.435Z",
    isOnline: true,
    projectName: "Beth Littel Sr.",
    startingOn: "2022-07-02T09:08:52.493Z",
    full_name: "Desiree White",
    estimatedTimeDuration: 5,
    estimatedTimeDurationMetric: "month",
    description:
      "Est est sit aut excepturi tempore quia dolor dicta. Adipisci voluptate placeat deleniti natus nihil. Voluptatem possimus ut repellendus consequuntur vitae. Ut a dicta totam. Dolorem aut voluptates eius ipsum officiis et quia optio. Veniam inventore error. Provident perspiciatis non cum dolores sapiente saepe esse quis eligendi. Maxime rem molestiae. Doloremque assumenda modi ducimus rem est. Quo voluptatem qui nobis eius dolores consequuntur molestiae.",
    difficulty: "advanced",
    type: "non-profitable",
    numberOfParticipant: 3,
    initialInvestment: false,
    initialInvestmentCost: 5,
    toolsAndTechnologies: [3, 7, 9, 4, 2, 1],
    jobTitle: [10, 3, 9, 1, 8, 5, 4, 7, 6],
    projectPicture: "http://loremflickr.com/640/480/abstract",
    attachments: [],
    userId: 1,
  },
  {
    id: 8,
    createdAt: "2022-12-20T16:16:54.435Z",
    updatedAt: "2022-12-20T16:16:54.435Z",
    isOnline: true,
    projectName: "Jon Legros",
    startingOn: "2022-06-14T10:05:12.524Z",
    full_name: "Kerry Sipes",
    estimatedTimeDuration: 2,
    estimatedTimeDurationMetric: "week",
    description:
      "Tempora vel voluptate ex ad totam. Est qui cumque quo. Quidem at praesentium sit. Delectus consequuntur voluptatem. Aliquid vitae facilis voluptas est quo et. Aperiam doloribus aut dignissimos dolore ducimus rerum numquam occaecati. Et quas explicabo. Porro quod distinctio aliquid. Possimus quod numquam. Quaerat modi et tempora omnis quia. Aperiam id et ratione. Non qui a et adipisci sint ut. Aut atque pariatur illo cum unde magnam est.",
    difficulty: "advanced",
    type: "non-profitable",
    numberOfParticipant: 3,
    initialInvestment: false,
    initialInvestmentCost: 88,
    toolsAndTechnologies: [6, 7, 9],
    jobTitle: [10, 8, 2, 5, 1],
    projectPicture: "http://loremflickr.com/640/480/abstract",
    attachments: [],
    userId: 8,
  },
  {
    id: 9,
    createdAt: "2022-12-20T16:16:54.435Z",
    updatedAt: "2022-12-20T16:16:54.435Z",
    isOnline: true,
    projectName: "Lowell Stoltenberg",
    startingOn: "2022-06-03T17:19:58.681Z",
    full_name: "Miriam Cassin",
    estimatedTimeDuration: 8,
    estimatedTimeDurationMetric: "week",
    description:
      "Nesciunt quod adipisci animi voluptatem quia. Rerum libero dolor dolores omnis explicabo voluptatum tempore. Ipsa et eum. Eaque culpa voluptatem sapiente sapiente. Consectetur sed corporis quaerat velit. Voluptate occaecati veniam expedita recusandae. Sint repellat tempora ut dolorem et aliquam quibusdam vel impedit. Eos iure iusto porro sunt sequi quae nulla. Labore quia molestias cum quia quod qui modi non. Magnam qui ipsa. Id quo ut ullam sit sit ex odio. Sed voluptatem provident odio sunt.",
    difficulty: "intermediate",
    type: "non-profitable",
    numberOfParticipant: 1,
    initialInvestment: false,
    initialInvestmentCost: 134,
    toolsAndTechnologies: [6],
    jobTitle: [2, 8, 9, 6, 5, 1, 3, 10, 4],
    projectPicture: "http://loremflickr.com/640/480/abstract",
    attachments: [],
    userId: 3,
  },
];

const Search = ({ pathname }: any) => {
  const myToast = useRef<any>();
  const [filters, setFilters] = useState<SearchBarFiltersTypes>({
    projectName: "",
    jobTitle: "default",
    orderBy: "default",
    difficulty: "default",
    isOnline: "default",
  });
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitlesTypes[]>([]);
  const [favourites, setFavourites] = useState<FavouritesTypes[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useStoreState((state: any) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const updateFavourites = async (method: "POST" | "DELETE", project: ProjectProps) => {
    notify(myToast, "Updating favourites...");

    await fetchJSON(`favourite/${project.id}`, method)
      .then((res) => {
        if (method === "POST") {
          setFavourites((prev) => [...prev, res]);
          updateToast(myToast, "SUCCESS", `${project.projectName} added to favourites`);
        } else {
          setFavourites((prev) => prev.filter((item) => item.projectId !== project.id));
          updateToast(myToast, "SUCCESS", `${project.projectName} removed from favourites`);
        }
      })
      .catch((err) => {
        console.error(err);
        updateToast(myToast, "ERROR", "We could not update your favourites. Please try again later.");
      });
  };

  const getProjectDetails = async (project: ProjectProps) => {
    setSelectedProject(project);
  };

  const getFavourites = async () => {
    await fetchJSON("favourite/user", "GET")
      .then((favourites: FavouritesTypes[]) => {
        setFavourites(() => favourites);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getJobTitles = async () => {
    await fetchJSON("job-titles", "GET")
      .then((jobTitles: JobTitlesTypes[]) => {
        setJobTitles(() => jobTitles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProjects = async (query?: string) => {
    setError(false);
    setIsLoading(true);

    let url = "project/all";

    if (query) url += query;

    await fetchJSON(url, "GET")
      .then(async (projects: ProjectProps[]) => {
        if (!user.isLoggedIn) {
          setProjects(() => projects);
        } else {
          setProjects(() => projects.filter((item: ProjectProps) => item.userId !== user.id));
        }

        if (query) {
          updateToast(myToast, "SUCCESS", "Results updated");
        }
      })
      .catch((err) => {
        if (query) updateToast(myToast, "ERROR", "We could not update your results. Please try again later.");
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // If the user logs in, we need to trigger that function again to get the updated list of favourites
    if (user.isLoggedIn) {
      getFavourites();
    }
  }, [user]);

  useEffect(() => {
    getJobTitles();
    getProjects();
  }, [setProjects, setIsLoading]);

  const queryBuilder = (): void => {
    // builder a query string from the filters object and return it
    let query = "?";

    if (filters.jobTitle && filters.jobTitle !== "all" && filters.jobTitle !== "default") {
      query += `jobTitle=${filters.jobTitle}&`;
    }

    if (filters.projectName && filters.projectName !== "") {
      query += `projectName=${filters.projectName}&`;
    }

    if (filters.orderBy && filters.orderBy !== "default") {
      query += `orderBy=${filters.orderBy}&`;
    }

    if (filters.difficulty && filters.difficulty !== "all" && filters.difficulty !== "default") {
      query += `difficulty=${filters.difficulty}&`;
    }

    if (filters.isOnline && filters.isOnline !== "all" && filters.isOnline !== "default") {
      query += `isOnline=${filters.isOnline === "online" ? true : false}&`;
    }

    notify(myToast, "Loading projects...");
    getProjects(query);
  };

  return (
    <PublicPageLayout pathname={pathname}>
      <SearchBar
        disabled={isLoading ? true : false}
        jobTitles={jobTitles}
        filters={filters}
        updateFilters={handleChange}
        buildQuery={() => queryBuilder()}
        isLoading={isLoading}
      />
      <MobileSearch
        disabled={isLoading ? true : false}
        jobTitles={jobTitles}
        filters={filters}
        updateFilters={handleChange}
        buildQuery={() => queryBuilder()}
        isLoading={isLoading}
      />

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
          <ListOfProjects
            isUserLoggedIn={user.isLoggedIn}
            jobTitles={jobTitles}
            projects={projects}
            favourites={favourites}
            getProjectDetails={getProjectDetails}
            updateFavourites={updateFavourites}
          />
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
