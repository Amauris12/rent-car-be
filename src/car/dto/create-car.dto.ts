import { IsString, IsInt, IsEnum, IsDate, IsBoolean, IsNumber, IsOptional, IsArray, IsUrl } from 'class-validator';
import { Express } from 'express';

enum VehicleType {
  Automovil = 'Automovil',
  Camioneta = 'Camioneta',
  Motocicleta = 'Motocicleta',
  Otro = 'Otro',
}

enum BodyType {
  Sedan = 'Sedán',
  Hatchback = 'Hatchback',
  SUV = 'SUV',
  Pickup = 'Pickup',
  familiar = 'familiar',
  Otro = 'Otro',
}

enum FuelType {
  Gasolina = 'Gasolina',
  GLP = 'GLP',
  Eléctrico = 'Eléctrico',
  Hibrido = 'Híbrido',
  Otro = 'Otro',
}

enum TransmissionType {
  Automatic = 'Automatic',
  Manual = 'Manual',
  SemiAutomatic = 'Semi-Automatic',
  Other = 'Other',
}

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  carType: string;

  @IsInt()
  passengers: number;

  @IsInt()
  luggages: number;

  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @IsEnum(FuelType)
  fule: FuelType;

  @IsString()
  mileage: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[]; 

  @IsString()
  LicensePlate: string;

  @IsString()
  description: string
}
