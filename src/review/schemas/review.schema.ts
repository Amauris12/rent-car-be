import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RentService } from 'src/rent-service/schemas/rentService.shema';

@Schema()
export class Review {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RentService' })
    rentService: RentService;

    @Prop({required: true})
    name: string;
    
    @Prop({ required: true })
    review: string;
    
    @Prop({ type: Date, default: Date.now })
    creationDate: Date;
}

export type ReviewDocument = HydratedDocument<Review>;

export const ReviewSchema = SchemaFactory.createForClass(Review);