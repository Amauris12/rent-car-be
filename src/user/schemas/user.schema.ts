import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    contactId: string;
  
    @Prop({required: true})
    password: string;
  
    @Prop({ type: Date, default: Date.now })
    creationDate: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);