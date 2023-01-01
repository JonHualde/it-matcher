import { IsNumber } from 'class-validator';

export class BasicDetailsDto {
  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly project_id: number;
}
