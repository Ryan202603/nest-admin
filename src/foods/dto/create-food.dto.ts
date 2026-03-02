import { IsString, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  cover?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  bgImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  desc?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  season?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  category?: string;

  @IsString()
  @IsOptional()
  nutrition?: string;

  @IsString()
  @IsOptional()
  tips?: string;

  @IsString()
  @IsOptional()
  pairings?: string;
}
