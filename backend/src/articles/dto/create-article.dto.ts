import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
