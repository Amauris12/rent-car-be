import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RentServiceService } from './rent-service.service';

import { CreateRentServiceDto } from './dto/create-rent-service.dto';
import { UpdateRentServiceDto } from './dto/update-rent-service.dto';

import { CreateContactDto } from './dto/create-contact.dto';
import { CreateLicenseDto } from './dto/create-license.dto';

import { RentService } from './schemas/rentService.shema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rent-service')
export class RentServiceController {
  constructor(
    private readonly rentServiceService: RentServiceService,
  ) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async createRentServiceTransaction(
    @Param('id') carId: string,
    @Body() 
    createContactWithLicenseDto: 
    { 
      createContactDto: CreateContactDto, 
      createLicenseDto: CreateLicenseDto, 
      createRentServiceDto: CreateRentServiceDto 

    }): Promise<RentService> {

    const { 
      createContactDto, 
      createLicenseDto, 
      createRentServiceDto 
    } = createContactWithLicenseDto; 

    return await this.rentServiceService.createRentServiceTransaction(
      carId,
      createContactDto, 
      createLicenseDto, 
      createRentServiceDto
    )
  }

  @Get()
  async findAll(): Promise<RentService[]> {
    return await this.rentServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentServiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentServiceDto: UpdateRentServiceDto) {
    return this.rentServiceService.update(id, updateRentServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rentServiceService.remove(id);
  }
}
