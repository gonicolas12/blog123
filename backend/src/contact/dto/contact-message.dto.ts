import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  subject: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  message: string;
}
