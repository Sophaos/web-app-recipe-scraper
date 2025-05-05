import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from 'src/recipe/recipe.schema';
import { Model } from 'mongoose';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';
import { toRecipeDTO } from './recipe.helper';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';
import { DeleteRecipesDto } from './dto/delete-recipes.dto';
import { DefaultCollectionDTO } from 'src/collection/dto/default-collection.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(recipe: RecipeDTO): Promise<RecipeDTO> {
    const existingRecipe = await this.recipeModel
      .findOne({ url: recipe.url })
      .lean()
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

  async findAll(search?: string): Promise<DefaultCollectionDTO> {
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const recipes = await this.recipeModel
      .find(filter)
      .sort({ _id: -1 })
      .lean()
      .exec();

    const totalCount = await this.recipeModel.estimatedDocumentCount();
    return {
      id: 'all-recipes',
      name: 'All Recipes',
      description: 'A collection of every recipes. (default collection)',
      recipeCount: totalCount,
      recipes: recipes.map((r) => toRecipeDTO(r)),
    };
  }

  async findOne(id: string): Promise<RecipeDTO> {
    const recipe = await this.findOneRaw(id);
    return toRecipeDTO(recipe);
  }

  async remove(deleteRecipeDto: DeleteRecipeDto): Promise<RecipeDTO> {
    const recipe = await this.recipeModel
      .findByIdAndDelete(deleteRecipeDto.id)
      .lean()
      .exec();
    if (!recipe) {
      throw new NotFoundException(
        `Recipe with ID ${deleteRecipeDto.id} not found`,
      );
    }
    return toRecipeDTO(recipe);
  }

  async removeMany(deleteRecipesDto: DeleteRecipesDto): Promise<RecipeDTO[]> {
    const { ids } = deleteRecipesDto;
    const recipes = await this.recipeModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec();

    if (!recipes.length) {
      throw new NotFoundException(`No recipes found for the provided IDs`);
    }

    await this.recipeModel
      .deleteMany({ _id: { $in: ids } })
      .lean()
      .exec();

    return recipes.map(toRecipeDTO);
  }

  async findOneRaw(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id).lean().exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async findManyRawByIds(ids: string[]): Promise<Recipe[]> {
    if (ids.length === 0) return [];
    return this.recipeModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec();
  }
}
