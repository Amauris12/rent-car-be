import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentService, RentServiceSchema } from 'src/rent-service/schemas/rentService.shema';
import { Contact, ContactSchema } from 'src/rent-service/schemas/contact.schema';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
      {
        name: RentService.name,
        schema: RentServiceSchema,
      },
      {
        name: Contact.name,
        schema: ContactSchema,
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
