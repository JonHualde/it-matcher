import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import ApplicationsTable from "shared/src/components/tables/applications-table";
import Toast from "shared/src/components/toast/toast";
import { ToastContainer, toast, Zoom } from "react-toastify";
// helpers
import Jwt from "../utils/jwt";
// Hooks
import { getUserApplications } from "../hooks/applications";
// types
import { FilterApplicationsData, ApplicationsTableProps } from "@types";

const Applications = (props: any) => {
  const myToast = useRef<any>();
  const [applications, setApplications] = useState([] as ApplicationsTableProps[]);
  const [filteredApplications, setFilteredApplications] = useState([] as ApplicationsTableProps[]);

  const { data, isLoading, isError } = getUserApplications();

  const filterApps = ({ projectName, status }: FilterApplicationsData) => {
    let newArray = applications;
    let filtered: any = applications;

    if (projectName) {
      filtered = newArray.filter((element: any) => element.projectName.includes(projectName));
    }

    if (status && status !== "all") {
      if (filtered) {
        filtered = filtered.filter((element: any) => element.status === status);
      } else {
        filtered = newArray.filter((element: any) => element.status === status);
      }
    }

    setFilteredApplications([...filtered]);
  };

  useEffect(() => {
    if (!isLoading && !data && isError.error) {
      myToast.current = toast(<Toast successMessage="Something wrong happen while getting the applications, please reload the page." />, {
        autoClose: 5000,
        closeButton: false,
        type: toast.TYPE.ERROR,
        transition: Zoom,
        toastId: Math.floor(Math.random() * 10),
      });
    }

    if (!isLoading && data && !isError?.error) {
      if (!toast.isActive(myToast.current)) {
        myToast.current = toast(<Toast successMessage="Table updated" />, {
          autoClose: 5000,
          closeButton: false,
          type: toast.TYPE.SUCCESS,
          transition: Zoom,
          toastId: Math.floor(Math.random() * 10),
        });
      }

      setApplications(data.applications);
      setFilteredApplications(data.applications);
    }
  }, [data, isLoading, isError]);

  return (
    <PrivatePageLayout title="APPLICATIONS RECEIVED" pathname={props.pathname}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} rtl={false} pauseOnFocusLoss />
      <FilterApplications filterApps={filterApps} />
      {isLoading ? <div className="mt-6">Loading...</div> : <ApplicationsTable applications={filteredApplications} />}
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  let user;

  try {
    user = new Jwt(ctx.req.cookies.access_token).verifyToken();

    if (user.error) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        email: user.email,
        permission: user.permission,
      },
      pathname: ctx.resolvedUrl,
    },
  };
}

export default Applications;
