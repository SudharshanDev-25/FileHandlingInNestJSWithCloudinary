import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  audioUrl: string;

  @Prop()
  videoUrl: string;

  @Prop()
  documentUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
