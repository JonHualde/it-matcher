import { IsEnum, IsNumber, IsString } from 'class-validator';

type status = 'Pending' | 'Rejected' | 'Accepted';
export const ApplicationsStatus: status[] = ['Pending', 'Rejected', 'Accepted'];

export class ApplicationDto {
  @IsEnum(ApplicationsStatus)
  readonly status: status;

  @IsNumber()
  readonly projectId: number;

  @IsNumber()
  readonly applicantId: number;
}
