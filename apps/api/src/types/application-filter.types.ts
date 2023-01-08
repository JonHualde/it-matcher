export default interface ApplicationFiltersTypes {
  project_name: string;
  applicantName: string;
  status: "default" | "Pending" | "Rejected" | "Accepted" | "All";
}
