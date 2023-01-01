import { useState, useEffect, useRef, ReactElement } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import { PrivatePageLayout } from "@shared-components/layouts";
import { ErrorMessage } from "@shared-components/error-message";
import { Table } from "@shared-components/tables";
import { Badge, Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Paragraph } from "@shared-components/typography";
import { Button } from "@shared-components/buttons";
import { ShowProjectModal } from "@shared-components/modals";
// types
import { UserSentApplicationsResponse, ApplicationsFiltersTypes, ProjectTypes, ApplicationTypes } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const Requests = (props: { pathname: string }) => {
  const [filters, setFilters] = useState<ApplicationsFiltersTypes>({
    project_name: "",
    applicantName: "",
    status: "default",
  });
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(null);
  const [applications, setApplications] = useState<UserSentApplicationsResponse[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<UserSentApplicationsResponse[]>([]);

  const applicationsFilter = () => {
    setIsFiltering(true);
    setFilteredApplications(() =>
      applications.filter((application: UserSentApplicationsResponse) => {
        if (
          (filters.project_name === "" || application.project.project_name.toLowerCase().includes(filters.project_name.toLowerCase())) &&
          (filters.status === "default" || filters.status === "All" || application.status === filters.status)
        ) {
          return application;
        }
      })
    );
    setIsFiltering(false);
  };

  const updateFilters = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getApplications = async () => {
    notify({ myToast, toastId: 1, message: "Getting applications..." });

    await fetchJSON("application/user-sent", "GET")
      .then((applications: UserSentApplicationsResponse[]) => {
        setApplications(applications);
        updateToast({ myToast, toastId: 1, type: "SUCCESS", message: "Applications successfully retrieved" });
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setErrorMessage(error.message);
        updateToast({
          myToast,
          toastId: 1,
          type: "ERROR",
          message: "Something wrong happen while getting the applications, please reload the page.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteApplication = async (applicationId: number) => {
    notify({ myToast, toastId: 3, message: "Deleting application..." });

    await fetchJSON(`application/${applicationId}`, "DELETE")
      .then((deletedApplication: ApplicationTypes) => {
        updateToast({ myToast, toastId: 3, type: "SUCCESS", message: "Application successfully deleted" });
        setApplications(applications.filter((application: UserSentApplicationsResponse) => deletedApplication.id !== application.id));
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setErrorMessage(error.message);
        updateToast({
          myToast,
          toastId: 3,
          type: "ERROR",
          message: error.message || "Something wrong happen while deleting the application, please reload the page.",
        });
      });
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <PrivatePageLayout title="Applications Sent" pathname={props.pathname}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <FilterApplications
        isFiltering={isFiltering}
        filters={filters}
        updateFilters={(e) => updateFilters(e)}
        applicationsFilter={applicationsFilter}
      />
      {isLoading ? (
        <Box>
          <>
            <Paragraph customClassName="flex items-center m-0 p-0 text-blue-dimmed italic text-xl font-semibold mb-4">
              Loading applications...
            </Paragraph>
            <Loader size={10} />
          </>
        </Box>
      ) : (
        <Table
          tableHeaders={{
            project: "Project name",
            createdAt: "Sent at",
            status: "Status",
            // Element added to the end of the table row, not part of applications data
            action: "Action",
          }}
          tableBody={{
            project: (project: ProjectTypes) => (
              <>
                {selectedProject && <ShowProjectModal selectedProject={selectedProject} close={() => setSelectedProject(null)} />}
                <Paragraph
                  click={() => setSelectedProject(project)}
                  customClassName="cursor-pointer text-blue-dimmed hover:underline hover:text-blue-500"
                >
                  {project.full_name}
                </Paragraph>
              </>
            ),

            createdAt: (value) => new Date(value).toLocaleString(),
            status: (value) => (
              <Badge customClassName="capitalize w-min" color={value === "Pending" ? "yellow" : value === "Accepted" ? "green" : "red"}>
                {value}
              </Badge>
            ),
            action: (application: UserSentApplicationsResponse): ReactElement | string => {
              if (application.status === "Pending") {
                return (
                  <Button
                    customClass="w-min"
                    padding="px-4 py-1.5"
                    text={"Delete"}
                    rounded="rounded-sm"
                    type="button"
                    color="bg-red-100"
                    textColor="text-red-800"
                    hover="hover:scale-105 transform transition duration-100 ease-in-out"
                    border="border border-red-800"
                    action={() => {
                      deleteApplication(application.id);
                    }}
                  />
                );
              }

              return "-";
            },
          }}
          tableData={filteredApplications.length > 0 ? filteredApplications : applications}
          emptyData="There is no applications to show"
        />
      )}{" "}
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      pathname: ctx.resolvedUrl,
    },
  };
}
export default Requests;
