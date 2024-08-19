import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Contact {
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    name: string;
  
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    lastName: string;
  
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    address: string;
  
    @Prop({ required: true })
    telephoneNumber: string;
  
    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    nationality: string;

    @Prop({ required: true, unique: true })
    idCard: string;
  
    @Prop({ required: true, default: 'contact' })
    userType: string;
  
    @Prop({ type: Date, default: Date.now })
    creationDate: Date;
}

export type ContactDocument = HydratedDocument<Contact>;

export const ContactSchema = SchemaFactory.createForClass(Contact);