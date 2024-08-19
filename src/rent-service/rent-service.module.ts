import { Module } from '@nestjs/common';
import { RentServiceService } from './rent-service.service';
import { RentServiceController } from './rent-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema'
import { License, LicenseSchema } from './schemas/license.schma';
import { RentService, RentServiceSchema } from './schemas/rentService.shema';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forFeature([
      {
        name: RentService.name,
        schema: RentServiceSchema,
      },
      {
        name: Contact.name,
        schema: ContactSchema,
      },
      {
        name: License.name,
        schema: LicenseSchema,
      },
    ]),
    CloudinaryModule,
    CarModule,
  ],
  controllers: [RentServiceController],
  providers: [RentServiceService],
})
export class RentServiceModule {}
