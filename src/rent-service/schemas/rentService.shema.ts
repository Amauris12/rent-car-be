import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contact } from './contact.schema'
import { Car } from 'src/car/schemas/car.schema'

@Schema()
export class RentService {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' })
    contact: Contact;

    @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'Car' })
    car: Car;
  
    @Prop({ required: true })
    pickupLocation: string;
  
    @Prop({ required: true })
    pickupDate: Date;
  
    @Prop({ required: true })
    pickupTime: string;
  
    @Prop({ required: true })
    dropOffLocation: string;
  
    @Prop({ required: true })
    dropOffDate: Date;
  
    @Prop({ required: true })
    dropOffTime: string;

    @Prop({ required: true })
    estimatedDuration: number;

    @Prop({ required: true, set: (value: string) => value.toUpperCase() })
    paymentStatus: string;

    @Prop({default: 0.0})
    totalCost: number;
    
    @Prop({default: 0.0})
    totalPayed: number;

    @Prop({ required: true, unique: true })
    uniqueCode: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    paypal: any 

    @Prop({ default: Date.now })
    creationDate: Date;
}

export type RentServiceDocument = HydratedDocument<RentService>;

export const RentServiceSchema = SchemaFactory.createForClass(RentService);