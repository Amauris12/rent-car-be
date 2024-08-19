import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/car/schemas/car.schema' 
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
    CloudinaryModule
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
