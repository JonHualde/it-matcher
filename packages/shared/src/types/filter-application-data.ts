export default interface FilterApplicationsData {
  project_name: string;
  status: "" | "all" | "Pending" | "Validated" | "Rejected";
}
