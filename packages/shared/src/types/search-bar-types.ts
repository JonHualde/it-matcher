export default interface SearchBarFiltersTypes {
  projectName: string;
  jobTitle: string | number;
  orderBy: string | null;
  difficulty: string;
  isOnline: "online" | "offline" | "all";
}
