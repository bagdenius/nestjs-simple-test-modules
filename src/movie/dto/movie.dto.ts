import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Movie title',
    example: 'Fight Club',
  })
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  @ApiProperty({
    type: Number,
    description: 'Movie release year',
    example: 1999,
  })
  releaseYear: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Link to poster of movie poster image',
    example: 'https://storage.example.com/posters/fight-club.webp',
  })
  imageUrl?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    type: [String],
    description: 'Array of IDs of actors played in movie',
    example: [
      '01fe0aee-d92d-4e46-ba4c-6995bcc00c07',
      '449577b9-3f2f-4424-8c6c-c2d3c330c153',
    ],
  })
  actorIds: string[];
}

export class MovieResponseDto {
  @ApiProperty({
    type: String,
    description: 'Movie ID',
    example: '044a01d7-385f-4a72-ab6f-48afbcc0e771',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Movie title',
    example: 'Fight Club',
  })
  title: string;

  @ApiProperty({
    type: Number,
    description: 'Movie release year',
    example: 1999,
  })
  releaseYear: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Link to poster of movie poster image',
    example: 'https://storage.example.com/posters/fight-club.webp',
  })
  imageUrl?: string;

  @ApiProperty({
    type: [String],
    description: 'Array actors played in movie',
    example: [
      '01fe0aee-d92d-4e46-ba4c-6995bcc00c07',
      '449577b9-3f2f-4424-8c6c-c2d3c330c153',
    ],
  })
  actorIds: string[];
}
