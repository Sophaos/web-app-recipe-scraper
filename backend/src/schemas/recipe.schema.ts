import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop()
  name?: string;

  @Prop()
  description?: string;

  @Prop({ type: [String] }) // Array of strings for ingredients
  ingredients?: string[];

  @Prop()
  keywords?: string;

  @Prop({ type: [String] }) // Array of strings for images
  image?: string[];

  @Prop({ unique: true })
  url?: string;

  @Prop({ type: [String] }) // Array of strings for instructions
  instructions?: string[];

  @Prop()
  prepTime?: string;

  @Prop()
  cookTime?: string;

  @Prop()
  totalTime?: string;

  @Prop({ type: [String] }) // Array of strings for yield (serving sizes, etc.)
  yield?: string[];

  @Prop({ type: [String] }) // Array of categories
  category?: string[];

  @Prop()
  cookingMethod?: string;

  @Prop()
  cuisine?: string;

  @Prop()
  rating?: string;

  @Prop()
  ratingCount?: string;

  @Prop()
  datePublished?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
