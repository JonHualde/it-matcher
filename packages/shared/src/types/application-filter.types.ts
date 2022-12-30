export default interface ApplicationFiltersTypes {
  projectName: string;
  applicantName: string;
  status: "default" | "Pending" | "Rejected" | "Accepted" | "All";
}
