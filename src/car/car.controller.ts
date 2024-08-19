import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, UploadedFile, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { SearchByLicenseCarDto } from './dto/searchByLicensePlate_car.dto';
import { Car } from 'src/car/schemas/car.schema' 
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<[string, HttpStatus]> {     
    return await this.carService.create(createCarDto);
  }

  @Get()
  async findAll(
    @Query() query: SearchByLicenseCarDto
  ): Promise<Car[]> {
    return await this.carService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<[string, HttpStatus]> {
    return await this.carService.remove(id);
  }
}
