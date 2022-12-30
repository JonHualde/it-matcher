import ProjectProps from "./project";

export default interface GetUserSentApplicationsResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "Accepted" | "Pending" | "Rejected";
  projectId: number;
  userId: number;
  project: ProjectProps;
}
