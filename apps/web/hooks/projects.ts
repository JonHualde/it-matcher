import useSWR from "swr";
import fetcher from "../utils/fetcher";

export const getUserProjects = () => {
  const { data, error } = useSWR("/project/get-user-projects", fetcher, {
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