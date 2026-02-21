import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Please enter your password' })
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(128, {
    message: 'Password should be less than 128 characters long',
  })
  password: string;
}
