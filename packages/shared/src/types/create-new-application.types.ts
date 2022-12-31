export default interface ApplicationTypes {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: "Accepted" | "Pending" | "Rejected" | string;
  projectId: number;
  userId: number;
}
