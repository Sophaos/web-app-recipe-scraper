import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from 'src/schemas/recipe.schema';
import { Model } from 'mongoose';
import { RecipeDTO } from 'src/models/recipe-dto';
import { toRecipeDTO } from './entities/recipe.helper';
import { DeleteRecipeDto } from './dto/delete-recipe-dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(recipe: RecipeDTO): Promise<RecipeDTO> {
    const existingRecipe = await this.recipeModel
      .findOne({ url: recipe.url })
      .exec();

    if (existingRecipe) {
      throw new ConflictException(
        `Recipe with URL ${recipe.url} already exists.`,
      );
    }
    const recipeToCreate = new this.recipeModel(recipe);
    const createdRecipe = await recipeToCreate.save();
    return toRecipeDTO(createdRecipe);
  }

  async findAll(search?: string): Promise<RecipeDTO[]> {
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const recipes = await this.recipeModel
      .find(filter)
      .sort({ _id: -1 })
      .exec();

    return recipes.map((r) => toRecipeDTO(r));
  }

  async findOne(id: string): Promise<RecipeDTO> {
    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return toRecipeDTO(recipe);
  }

  async remove(deleteRecipeDto: DeleteRecipeDto): Promise<RecipeDTO> {
    const recipe = await this.recipeModel
      .findByIdAndDelete(deleteRecipeDto.id)
      .exec();
    if (!recipe) {
      throw new NotFoundException(
        `Recipe with ID ${deleteRecipeDto.id} not found`,
      );
    }
    return toRecipeDTO(recipe);
  }
}
