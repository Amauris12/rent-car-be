import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Contactreview {
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    name: string;
  
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    lastName: string;
  
    @Prop({ required: true, unique: true, set: (value: string) => value.toUpperCase() })
    email: string;

    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    message: string;
  
    @Prop({ type: Date, default: Date.now })
    creationDate: Date;
}

export type ContactreviewDocument = HydratedDocument<Contactreview>;

export const ContactreviewSchema = SchemaFactory.createForClass(Contactreview);