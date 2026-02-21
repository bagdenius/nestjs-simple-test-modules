import { IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString({ message: 'Link should be a string' })
  @IsUrl({}, { message: 'Invalid URL' })
  originalUrl: string;
}
