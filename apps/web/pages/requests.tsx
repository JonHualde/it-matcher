import { useState, useEffect, useRef } from "react";
import FilterApplications from "shared/src/components/forms/filter-applications";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import RequestsTable from "shared/src/components/tables/requests-table";
import Toast from "shared/src/components/toast/toast";
import { ToastContainer, toast, Zoom } from "react-toastify";
// helpers
import Jwt from "../utils/jwt";
// Hooks
import { getUserRequests } from "../hooks/applications";
// types
import { FilterApplicationsData, RequestsTableProps } from "@types";

const Requests = (props: any) => {
  const myToast = useRef<any>();
  const [requests, setRequests] = useState([] as RequestsTableProps[]);
  const [filteredRequests, setFilteredRequests] = useState([] as RequestsTableProps[]);

  const { data, isLoading, isError } = getUserRequests();

  const filterApps = ({ projectName, status }: FilterApplicationsData) => {
    let newArray = requests;
    let filtered: any = requests;

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

    setFilteredRequests([...filtered]);
  };

  useEffect(() => {
    if (!isLoading && !data && isError.error) {
      myToast.current = toast(<Toast successMessage="Something wrong happen while getting the requests, please reload the page." />, {
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

      setRequests(data.requests);
      setFilteredRequests(data.requests);
    }
  }, [data, isLoading, isError]);

  return (
    <PrivatePageLayout title="REQUESTS SENT" pathname={props.pathname}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} rtl={false} pauseOnFocusLoss />
      <FilterApplications filterApps={filterApps} />
      {isLoading ? <div className="mt-6">Loading...</div> : <RequestsTable requests={filteredRequests} />}
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

export default Requests;
