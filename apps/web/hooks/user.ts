import useSWR from "swr";
import fetcher from "../utils/fetcher";

export const getUserInfo = () => {
  const { data, error } = useSWR("/user/get-user-info", fetcher, {
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

export const getUserPicture = () => {
  const { data, error } = useSWR(
    ["/user/get-profile-picture", undefined, true],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  return {
    profilePicture: data,
    isLoading: !data && !error,
    isError: error,
  };
};
