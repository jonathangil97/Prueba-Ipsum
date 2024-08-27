import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class User {

    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ minlength: 7, required: true })
    password: string;

    @Prop()
    profileImage: string;

    @Prop()
    favoriteFood: string;

    @Prop()
    favoriteArtist: string;

    @Prop()
    favoritePlace: string;

    @Prop()
    favoriteColor: string;

    @Prop({ type: [String], enum: ['user', 'admin'], default: ['user'] })
    role: string[];
}

// se exporta el Schema
export const UserSchema = SchemaFactory.createForClass( User );