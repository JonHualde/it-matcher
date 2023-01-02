export default interface SubmitProjectTypes {
  is_online: boolean;
  project_name: string;
  starting_on: Date;
  estimated_time_duration: number;
  estimated_time_duration_metric: string;
  description: string;
  difficulty: string;
  type: string;
  initial_investment: boolean;
  initial_investment_cost: number;
  tools_and_technologies: number[];
  job_titles_wanted: number[];
  project_main_picture: string | File;
  attachments: string[] | File[];
}
