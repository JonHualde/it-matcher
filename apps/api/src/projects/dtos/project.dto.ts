import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsInt,
  Length,
  Max,
  Min,
  IsNotEmpty,
  MinDate,
} from 'class-validator';

type orderBy = 'asc' | 'desc';
const orderByDto: orderBy[] = ['asc', 'desc'];

type durationMetrics = 'day' | 'week' | 'month';
const durationMetricsDto: durationMetrics[] = ['day', 'week', 'month'];

type difficultyOptions = 'beginner' | 'intermediate' | 'advanced' | 'expert';
const difficultyDto: difficultyOptions[] = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
];

export class ProjectIdDto {
  @IsNumber()
  readonly projectId: number;
}

export class ProjectDto {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly userId: number;

  @IsString()
  @Length(2, 255)
  readonly projectName: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly startingOn: Date;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(52)
  readonly estimatedTimeDuration: number;

  @IsEnum(durationMetricsDto)
  @IsString()
  readonly estimatedTimeDurationMetric: durationMetrics;

  @IsString()
  @Length(2, 2000)
  readonly description: string;

  @IsEnum(difficultyDto)
  @IsString()
  readonly difficulty: difficultyOptions;

  @IsString()
  @Length(2, 255)
  readonly type: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(10)
  readonly numberOfParticipant: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @Max(1000000)
  readonly initialInvestmentCost: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  readonly initialInvestment: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  readonly isOnline: boolean;

  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly jobTitle: number[];

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly toolsAndTechnologies: number[];

  @IsOptional()
  @IsNotEmpty()
  readonly projectPicture: string;
}

export class FilterProjectDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  readonly isOnline: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  readonly projectName: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly userId: number;

  @IsOptional()
  @IsEnum(difficultyDto)
  @IsString()
  readonly difficulty: difficultyOptions;

  @IsOptional()
  @IsEnum(orderByDto)
  readonly orderBy: orderBy;
}
