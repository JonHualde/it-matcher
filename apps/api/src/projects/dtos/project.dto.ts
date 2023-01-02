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

type projectTypeOptions = 'profiable' | 'non-profitable' | 'training project';
const typeDto: projectTypeOptions[] = [
  'profiable',
  'non-profitable',
  'training project',
];

export class project_idDto {
  @IsNumber()
  readonly project_id: number;
}

export class ProjectDto {
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  readonly is_online: boolean;

  @IsString()
  @Length(2, 255)
  readonly project_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly starting_on: Date;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(52)
  readonly estimated_time_duration: number;

  @IsEnum(durationMetricsDto)
  @IsString()
  readonly estimated_time_duration_metric: durationMetrics;

  @IsString()
  @Length(2, 2000)
  readonly description: string;

  @IsEnum(difficultyDto)
  @IsString()
  readonly difficulty: difficultyOptions;

  @IsEnum(typeDto)
  @IsString()
  @Length(2, 255)
  readonly type: projectTypeOptions;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Min(1)
  @Max(1000000)
  readonly initial_investment_cost: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  readonly initial_investment: boolean;

  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly job_titles_wanted: number[];

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly tools_and_technologies: number[];

  @IsOptional()
  @IsNotEmpty()
  readonly project_main_picture: string;

  @IsOptional()
  @IsNotEmpty()
  readonly attachments: string | string[];
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
  readonly project_name: string;

  @IsOptional()
  @IsEnum(difficultyDto)
  @IsString()
  readonly difficulty: difficultyOptions;

  @IsOptional()
  @IsEnum(orderByDto)
  readonly orderBy: orderBy;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly jobTitle: number;
}
