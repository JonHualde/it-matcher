import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ErrorMessage } from "@shared-components/error-message";
import { Table } from "@shared-components/tables";
import { Badge } from "@shared-components/status";
import { Button } from "@shared-components/button";
// types
import { GetUserApplicationsResponse } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";
const mockData = [
  {
    id: 23,
    createdAt: "2022-12-28T12:59:14.121Z",
    updatedAt: "2022-12-28T12:59:14.121Z",
    status: "Pending",
    projectId: 5,
    userId: 1,
    project: {
      projectName: "Josefina Cormier",
    },
    user: {
      email: "jonhualde94@gmail.com",
      first_name: "Jon",
      last_name: "Hualdee",
      github_url: "https://github.com/JonHualde",
      linkedIn_url: "http://periodic-recorder.name",
      instagram_username: "https://earnest-bit.org",
      website_url: "https://corrupt-pocketbook.name",
      notion_page_url: "https://shameful-gift.net",
      profile_picture_ref: "pictures/f933bbbc-5b72-4194-ac1e-84adf42f66fc-svpp.jpeg",
    },
  },
  {
    id: 24,
    createdAt: "2022-12-30T16:15:21.101Z",
    updatedAt: "2022-12-30T16:15:21.101Z",
    status: "Pending",
    projectId: 5,
    userId: 4,
    project: {
      projectName: "Josefina Cormier",
    },
    user: {
      email: "Zoie_Halvorson20@gmail.com",
      first_name: "General",
      last_name: "Streich",
      github_url: null,
      linkedIn_url: "",
      instagram_username: "http://flashy-bird-watcher.org",
      website_url: "http://ancient-sign.net",
      notion_page_url: "https://distant-bride.info",
      profile_picture_ref: "pictures/a4f24fd7-e510-4b7c-879b-7583e990a0b8-image.jpg",
    },
  },
  {
    id: 25,
    createdAt: "2022-12-30T16:16:06.494Z",
    updatedAt: "2022-12-30T16:16:06.494Z",
    status: "Pending",
    projectId: 21,
    userId: 4,
    project: {
      projectName: "Jon project 3",
    },
    user: {
      email: "Zoie_Halvorson20@gmail.com",
      first_name: "General",
      last_name: "Streich",
      github_url: null,
      linkedIn_url: "",
      instagram_username: "http://flashy-bird-watcher.org",
      website_url: "http://ancient-sign.net",
      notion_page_url: "https://distant-bride.info",
      profile_picture_ref: "pictures/a4f24fd7-e510-4b7c-879b-7583e990a0b8-image.jpg",
    },
  },
];
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

  const updateApplicationStatus = async (item: GetUserApplicationsResponse, status: "Rejected" | "Accepted") => {
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
      <Table
        tableHeaders={{
          user: "Applicant name",
          project: "Project Name",
          createdAt: "Sent at",
          status: "Status",
          action: "Action",
        }}
        tableBody={{
          user: (value) => `${value.first_name} ${value.last_name}`,
          project: (value) => value.projectName,
          createdAt: (value) => new Date(value).toLocaleDateString(),
          status: (value) => (
            <Badge customClassName="capitalize w-min" color={value === "Pending" ? "yellow" : value === "Accepted" ? "green" : "red"}>
              {value}
            </Badge>
          ),
          action: (item: GetUserApplicationsResponse) => {
            if (item.status === "Pending") {
              return (
                <div className="flex gap-2">
                  <Button
                    customClass="w-min"
                    padding="px-4 py-1.5"
                    text={"Accept"}
                    type="button"
                    color="bg-green-100"
                    textColor="text-green-800"
                    hover="hover:scale-105 transform transition duration-100 ease-in-out"
                    border="border-0"
                    action={() => {
                      updateApplicationStatus(item, "Accepted");
                    }}
                  />
                  <Button
                    customClass="w-min"
                    padding="px-4 py-1.5"
                    text={"Reject"}
                    type="button"
                    color="bg-red-100"
                    textColor="text-red-800"
                    hover="hover:scale-105 transform transition duration-100 ease-in-out"
                    border="border-0"
                    action={() => {
                      updateApplicationStatus(item, "Rejected");
                    }}
                  />
                </div>
              );
            }

            return "-";
          },
        }}
        tableData={mockData}
        emptyData="You have not received any applications yet."
      />
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
