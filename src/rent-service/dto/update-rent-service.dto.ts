import { PartialType } from '@nestjs/mapped-types';
import { CreateRentServiceDto } from './create-rent-service.dto';

export class UpdateRentServiceDto extends PartialType(CreateRentServiceDto) {}
