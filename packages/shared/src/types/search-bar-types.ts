export default interface SearchBarFiltersTypes {
  projectName: string;
  jobTitle: string | number;
  orderBy: string;
  difficulty: string;
  isOnline: "online" | "offline" | "all" | "default";
}
