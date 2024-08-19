import { IsString, IsEmail } from 'class-validator';

export class CreateContactreviewDto { 
@IsString()
name: string;

@IsString()
lastName: string;

@IsEmail()
email: string

@IsString()
message: string;
}
