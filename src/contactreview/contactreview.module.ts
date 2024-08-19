import { Module } from '@nestjs/common';
import { ContactreviewService } from './contactreview.service';
import { ContactreviewController } from './contactreview.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contactreview, ContactreviewSchema } from './schemas/contactreview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Contactreview.name,
        schema: ContactreviewSchema,
      },
    ]),
  ],
  controllers: [ContactreviewController],
  providers: [ContactreviewService],
})
export class ContactreviewModule {}
