import { IsString, IsDate } from 'class-validator';

export class CreateLicenseDto {

    @IsString()
    contact: string;
  
    @IsString()
    licencenumber: string;

}
