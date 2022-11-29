import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

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
  @IsString()
  @Length(2, 255)
  readonly projectName: string;

  @IsDate()
  readonly startingOn: Date;

  @IsNumber()
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

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly searchingFor: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly numberOfParticipant: number;

  @IsBoolean()
  readonly initialInvestment: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(1000000)
  readonly initialInvestmentCost: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly toolsAndTechnologies: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  readonly attachments: string[];

  @IsBoolean()
  readonly isOnline: boolean;

  @IsNumber()
  readonly userId: number;
}
