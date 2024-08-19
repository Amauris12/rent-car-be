import { IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
    @IsString()
    name: string;
  
    @IsString()
    lastName: string;
  
    @IsString()
    address: string;
  
    @IsString()
    telephoneNumber: string;
  
    @IsString()
    nationality: string;

    @IsString()
    idCard: string;

}
