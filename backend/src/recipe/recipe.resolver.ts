import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { ScraperService } from 'src/scraper/scraper.service';
import { RecipeService } from './recipe.service';
import { RecipeDTO } from 'src/models/recipe-dto';
import { CreateRecipeDto } from './dto/create-recipe-dto';

@Resolver(() => RecipeDTO)
export class RecipeResolver {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly scraperService: ScraperService,
  ) {}

  @Mutation(() => RecipeDTO)
  async createRecipe(
    @Args('data') createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDTO> {
    const recipe = await this.scraperService.scrapeRecipe(createRecipeDto);
    if (!recipe) {
      throw new BadRequestException('Failed to scrape recipe');
    }
    return this.recipeService.create(recipe);
  }

  @Query(() => [RecipeDTO])
  async getRecipes(): Promise<RecipeDTO[]> {
    return this.recipeService.findAll();
  }

  @Query(() => RecipeDTO)
  async getRecipe(@Args('id') id: string): Promise<RecipeDTO> {
    const recipe = await this.recipeService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Args('id') id: string): Promise<boolean> {
    const result = await this.recipeService.remove(id);
    return result.deleted;
  }
}
