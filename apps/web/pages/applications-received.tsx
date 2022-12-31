import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ErrorMessage } from "@shared-components/error-message";
import { Table } from "@shared-components/tables";
import { Badge, Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Paragraph } from "@shared-components/typography";
import { ApplicationTableButtons } from "shared/src/components/buttons";
import { ShowProjectModal, ShowUserModal } from "@shared-components/modals";
// types
import { User, GetUserReceivedApplicationsResponse, ApplicationsFiltersTypes, ProjectTypes } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const ApplicationsReceived = (props: any) => {
  const [filters, setFilters] = useState<ApplicationsFiltersTypes>({
    projectName: "",
    applicantName: "",
    status: "default",
  });
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(null);
  const [applications, setApplications] = useState<GetUserReceivedApplicationsResponse[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<GetUserReceivedApplicationsResponse[]>([]);

  const applicationsFilter = () => {
    setIsFiltering(true);
    setFilteredApplications(() =>
      applications.filter((application: GetUserReceivedApplicationsResponse) => {
        if (
          (filters.projectName === "" || application.project.projectName.toLowerCase().includes(filters.projectName.toLowerCase())) &&
          (filters.applicantName === "" ||
            `${application.user.first_name} ${application.user.last_name}`.toLowerCase().includes(filters.applicantName.toLowerCase())) &&
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

  const updateApplicationStatus = async (item: GetUserReceivedApplicationsResponse, status: "Rejected" | "Accepted") => {
    notify({ myToast, toastId: 2, message: "Updating application status..." });
    await fetchJSON(`application`, "PATCH", {
      id: item.id,
      status,
    })
      .then(() => {
        updateToast({ myToast, toastId: 2, type: "SUCCESS", message: "Application status successfully updated" });
        // Find the application in the applications state and update the status to the new one (Accepted or Rejected)
        setApplications((prev) => {
          const newApplications = prev.map((application) => {
            if (application.id === item.id) {
              return { ...application, status };
            }
            return application;
          });
          return newApplications;
        });
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setErrorMessage(error.message);
        updateToast({
          myToast,
          toastId: 2,
          type: "ERROR",
          message: error.message,
        });
      });
  };

  const getApplications = async () => {
    notify({ myToast, toastId: 1, message: "Getting applications..." });

    await fetchJSON("application/user-received", "GET")
      .then((applications: GetUserReceivedApplicationsResponse[]) => {
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

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <PrivatePageLayout title="Applications Received" pathname={props.pathname}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <FilterApplications
        isFiltering={isFiltering}
        filters={filters}
        updateFilters={(e) => updateFilters(e)}
        applicationsFilter={applicationsFilter}
      />
      {isLoading ? (
        <Box border="border border-blue-ocean">
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
            user: "Applicant name",
            project: "Project Name",
            createdAt: "Sent at",
            status: "Status",
            // Element added to the end of the table row, not part of applications data
            action: "Action",
          }}
          tableBody={{
            user: (user: User) => (
              <>
                {selectedUser && <ShowUserModal user={selectedUser} close={() => setSelectedUser(null)} />}
                <Paragraph
                  click={() => setSelectedUser(user)}
                  customClassName="cursor-pointer text-blue-dimmed hover:underline hover:text-blue-500"
                >
                  {user.first_name + " " + user.last_name}
                </Paragraph>
              </>
            ),
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
            createdAt: (value) => new Date(value).toLocaleDateString(),
            status: (value) => (
              <Badge customClassName="capitalize w-min" color={value === "Pending" ? "yellow" : value === "Accepted" ? "green" : "red"}>
                {value}
              </Badge>
            ),
            action: (item: GetUserReceivedApplicationsResponse) => (
              <ApplicationTableButtons item={item} action={(item, status) => updateApplicationStatus(item, status)} />
            ),
          }}
          tableData={filteredApplications.length > 0 ? filteredApplications : applications}
          emptyData="There is no applications to show."
        />
      )}
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
export default ApplicationsReceived;
