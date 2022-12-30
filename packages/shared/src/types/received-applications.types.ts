import ProjectProps from "./project";

export default interface GetUserReceivedApplicationsResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "Accepted" | "Pending" | "Rejected";
  projectId: number;
  userId: number;
  project: ProjectProps;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    github_url: string;
    linkedIn_url: string;
    instagram_username: string;
    website_url: string;
    notion_page_url: string;
    profile_picture_ref: string;
  };
}
