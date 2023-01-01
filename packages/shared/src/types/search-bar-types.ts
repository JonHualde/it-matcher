export default interface SearchBarFiltersTypes {
  project_name: string;
  job_title_wanted: string | number;
  orderBy: string;
  difficulty: string;
  is_online: "online" | "offline" | "all" | "default";
}
