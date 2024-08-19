import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class License {
    @Prop({required: true})
    contact: string;
    
    @Prop({ required: true, unique: true })
    licencenumber: string;
}

export type LicenseDocument = HydratedDocument<License>;

export const LicenseSchema = SchemaFactory.createForClass(License);