export default interface ProjectTypes {
  id?: number;
  user_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  is_online: boolean;
  project_name: string;
  starting_on: Date | string;
  full_name: string;
  estimated_time_duration: number;
  estimated_time_duration_metric: string;
  description: string;
  difficulty: string;
  type: string;
  number_of_participants: number;
  initial_investment: boolean;
  initial_investment_cost: number;
  tools_and_technologies: number[];
  participants_ids: number[];
  job_titles_filled: number[];
  job_titles_wanted: number[];
  project_main_picture: string | File;
  attachments: string[] | File[];
}
