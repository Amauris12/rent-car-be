import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { RentServiceModule } from './rent-service/rent-service.module';
import { ReviewModule } from './review/review.module';
import { ContactreviewModule } from './contactreview/contactreview.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    CarModule,
    UserModule,
    RentServiceModule,
    ReviewModule,
    ContactreviewModule,
    CloudinaryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
