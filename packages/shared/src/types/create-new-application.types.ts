export default interface ApplicationTypes {
  id: number;
  created_at: string | Date;
  updated_at: string | Date;
  status: "Accepted" | "Pending" | "Rejected" | string;
  project_id: number;
  user_id: number;
  job_title_id: number;
}
