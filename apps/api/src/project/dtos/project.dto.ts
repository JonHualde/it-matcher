import { IsNumber } from 'class-validator';

export class ProjectIdDto {
  @IsNumber()
  readonly projectId: number;
}
