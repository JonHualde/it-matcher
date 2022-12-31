export default interface ProjectTypes {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  isOnline: boolean;
  projectName: string;
  startingOn: Date | string;
  full_name: string;
  estimatedTimeDuration: number;
  estimatedTimeDurationMetric: string;
  description: string;
  difficulty: string;
  type: string;
  numberOfParticipant: number;
  initialInvestment: boolean;
  initialInvestmentCost: number;
  toolsAndTechnologies: number[];
  jobTitle: number[];
  attachments: string[];
  projectPicture: string;
  userId: number;
}
