import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Car {
    @Prop({ required: true })
    brand: string;
  
    @Prop({ required: true })
    carType: string;
  
    @Prop({ required: true })
    passengers: number;

    @Prop({ required: true })
    luggages: number;
  
    @Prop({ required: true })
    transmission: string;

    @Prop()
    fule: string;
  
    @Prop({ required: true })
    mileage: string;
  
    @Prop({ required: true })
    price: number;
    
    @Prop({ type: [String], default: [] }) 
    images?: string[];

    @Prop({ required: true, unique: true, uppercase: true })
    LicensePlate: string;
    
    @Prop({ required: true })
    description: string;
    
    @Prop({ required: true, default: true})
    availability: boolean;
  
    @Prop({ type: Date, default: Date.now })
    creationDate: Date;
}

export type CarDocument = HydratedDocument<Car>;

export const CarSchema = SchemaFactory.createForClass(Car);