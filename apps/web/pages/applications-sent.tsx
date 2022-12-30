import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ErrorMessage } from "@shared-components/error-message";
import { Table } from "@shared-components/tables";
import { Badge, Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Paragraph } from "@shared-components/typography"; // types
import { GetUserSentApplicationsResponse, ApplicationsFiltersTypes } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const Requests = (props: any) => {
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
  const [applications, setApplications] = useState<GetUserSentApplicationsResponse[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<GetUserSentApplicationsResponse[]>([]);

  const applicationsFilter = () => {
    setIsFiltering(true);
    setFilteredApplications(() =>
      applications.filter((application: GetUserSentApplicationsResponse) => {
        if (
          (filters.projectName === "" || application.project.projectName.toLowerCase().includes(filters.projectName.toLowerCase())) &&
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
      .then((applications: GetUserSentApplicationsResponse[]) => {
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
              Loading projects
            </Paragraph>
            <Loader size={10} />
          </>
        </Box>
      ) : (
        <Table
          tableHeaders={{
            project: "Project Name",
            createdAt: "Sent at",
            status: "Status",
            action: "Action",
          }}
          tableBody={{
            project: (value) => value.projectName,
            createdAt: (value) => new Date(value).toLocaleDateString(),
            status: (value) => (
              <Badge customClassName="capitalize w-min" color={value === "Pending" ? "yellow" : value === "Accepted" ? "green" : "red"}>
                {value}
              </Badge>
            ),
            action: () => <p>test</p>,
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
