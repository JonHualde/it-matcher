export default interface ProjectProps {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  mainPicture: string;
  projectName: string;
  startingOn: Date | string;
  estimatedTimeDuration: number;
  estimatedTimeDurationMetric: string;
  description: string;
  difficulty: string;
  type: string;
  numberOfParticipant: number;
  initialInvestment: boolean;
  initialInvestmentCost: number;
  attachments: Array<string>;
  putOnline: true;
  userId: number;
  searchingFor: object;
  toolsAndTechnologies: object;
}
