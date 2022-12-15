import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export type statusOptions = 'Pending' | 'Rejected' | 'Accepted';
export const ApplicationsStatus: statusOptions[] = [
  'Pending',
  'Rejected',
  'Accepted',
];

export class ApplicationDto {
  @IsEnum(ApplicationsStatus)
  readonly status: statusOptions;

  @IsNumber()
  readonly projectId: number;

  @IsNumber()
  readonly userId: number;
}

export class UpdateApplicationDto {
  @IsEnum(ApplicationsStatus)
  readonly status: statusOptions;

  @IsNumber()
  readonly id: number;
}

export class StatusDto {
  @IsEnum(ApplicationsStatus)
  @IsOptional()
  readonly status: statusOptions;
}
