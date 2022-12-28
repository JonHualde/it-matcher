export default interface GetUserApplicationsResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "Accepted" | "Pending" | "Rejected";
  projectId: number;
  userId: number;
}
