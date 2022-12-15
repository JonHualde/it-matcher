import { IsNumber } from 'class-validator';

export class AddFavouriteDto {
  @IsNumber()
  readonly id: number;
}
