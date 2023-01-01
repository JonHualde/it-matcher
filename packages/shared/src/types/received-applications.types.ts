import ProjectTypes from "./project.types";
import User from "./user.types";
export default interface GetUserReceivedApplicationsResponse {
  id: number;
  created_at: string | Date;
  updated_at: string | Date;
  status: "Accepted" | "Pending" | "Rejected";
  project_id: number;
  user_id: number;
  job_title_id: number;
  project: ProjectTypes;
  user: User;
}
