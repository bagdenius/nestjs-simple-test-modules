import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({
    description: "User's account email",
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Please enter your password' })
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(128, {
    message: 'Password should be less than 128 characters long',
  })
  @ApiProperty({
    description: "User's account password",
    example: 'pass1234',
    minLength: 6,
    maxLength: 128,
  })
  password: string;
}
