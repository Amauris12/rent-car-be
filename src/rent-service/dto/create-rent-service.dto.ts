import { IsString, IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreateRentServiceDto {
    @IsString()
    contact: string;
  
    @IsString()
    car: string;
  
    @IsString()
    pickupLocation: string;
  
    @IsDate()
    pickupDate: Date;
  
    @IsString()
    pickupTime: string;
  
    @IsString()
    dropOffLocation: string;
  
    @IsDate()
    dropOffDate: Date;
  
    @IsString()
    dropOffTime: string;

    @IsNumber()
    estimatedDuration: number;

    @IsString()
    paymentStatus: string;

    @IsNumber()
    totalCost
   
    @IsNumber()
    totalPayed

    @IsUUID()
    uniqueCode: string;

    paypal: any
}
