import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import ApplicationsTable from "shared/src/components/tables/applications-table";
import Toast from "shared/src/components/toast/toast";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { ErrorMessage } from "@shared-components/error-message";
// types
import { GetUserApplicationsResponse, FilterApplicationsData, ApplicationsTableProps } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const Applications = (props: any) => {
  const [filters, setFilters] = useState<{ projectName: string; applicationStatus: string }>({
    projectName: "",
    applicationStatus: "default",
  });
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [applications, setApplications] = useState<GetUserApplicationsResponse[]>([]);

  const applicationsFilter = () => {
    // Use the filters.applicationStatus to filter through the applications, and update the applications state
  };

  const updateFilters = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getApplications = async () => {
    notify({ myToast, toastId: 1, message: "Getting applications..." });

    await fetchJSON("application/user", "GET")
      .then((applications: GetUserApplicationsResponse[]) => {
        setApplications(applications);
        // setFilteredApplications(applications);
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
      });
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <PrivatePageLayout title="Applications received" pathname={props.pathname}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <FilterApplications filters={filters} updateFilters={(e) => updateFilters(e)} applicationsFilter={applicationsFilter} />
      <ApplicationsTable applications={applications} />
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
export default Applications;
