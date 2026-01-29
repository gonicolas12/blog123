import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  sportifName: string;

  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsArray()
  @IsString({ each: true })
  questions: string[];

  @IsArray()
  @IsString({ each: true })
  answers: string[];

  @IsString()
  @IsOptional()
  audioUrl?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
