import { IsEnum, IsNumber, IsString } from 'class-validator';

export type statusDto = 'Pending' | 'Rejected' | 'Accepted';
export const ApplicationsStatus: statusDto[] = [
  'Pending',
  'Rejected',
  'Accepted',
];

export class ApplicationDto {
  @IsEnum(ApplicationsStatus)
  readonly status: statusDto;

  @IsNumber()
  readonly projectId: number;

  @IsNumber()
  readonly applicantId: number;
}
