import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from 'src/schemas/recipe.schema';
import { Model } from 'mongoose';
import { RecipeDetails } from 'src/models/recipe-details';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: RecipeDetails): Promise<RecipeDocument> {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    return createdRecipe.save();
  }

  async findAll(): Promise<RecipeDocument[]> {
    return this.recipeModel.find().exec();
  }

  async findOne(id: string): Promise<RecipeDocument> {
    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async remove(id: string): Promise<{ deleted: boolean; message: string }> {
    const result = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!result) {
      return { deleted: false, message: `Recipe with ID ${id} not found` };
    }
    return { deleted: true, message: 'Recipe deleted successfully' };
  }
}
