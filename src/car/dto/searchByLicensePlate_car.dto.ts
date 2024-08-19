import { IsString, IsNotEmpty } from 'class-validator';
export class SearchByLicenseCarDto {
  licensePlateNumber: string | null;
}
