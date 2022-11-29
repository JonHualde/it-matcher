import { IsString, IsNumber } from 'class-validator';

export class I18NResponse<T> {
  @IsNumber()
  readonly statusCode: number;

  @IsString()
  readonly i18n: string;

  readonly body: T | null;

  constructor(i18n: string, body: T | null = null, statusCode = 200) {
    this.i18n = i18n;
    this.body = body;
    this.statusCode = statusCode;
  }
}
