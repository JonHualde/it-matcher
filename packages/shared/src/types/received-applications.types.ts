import ProjectTypes from "./project";
import User from "./user";
export default interface GetUserReceivedApplicationsResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "Accepted" | "Pending" | "Rejected";
  projectId: number;
  userId: number;
  project: ProjectTypes;
  user: User;
}
