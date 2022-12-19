import useSWR from "swr";

function UserProfile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>Failed to load user</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}
