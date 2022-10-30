import useSWR from "swr";
import fetcher from "../utils/fetcher";

export const getUserApplications = () => {
  const { data, error } = useSWR("/application/get-user-applications", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const getUserRequests = () => {
  const { data, error } = useSWR("/requests/get-user-requests", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
}