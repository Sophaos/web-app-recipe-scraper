import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScraperService } from 'src/scraper/scraper.service';
import { RecipeService } from './recipe.service';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';
import { DeleteRecipesDto } from './dto/delete-recipes.dto';
import { DefaultCollectionDTO } from 'src/collection/dto/default-collection.dto';

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
    return await this.recipeService.create(recipe);
  }

  @Query(() => DefaultCollectionDTO)
  async getRecipes(
    @Args('search', { nullable: true }) search?: string,
  ): Promise<DefaultCollectionDTO> {
    return this.recipeService.findAll(search);
  }

  @Query(() => RecipeDTO)
  async getRecipe(@Args('id') id: string): Promise<RecipeDTO> {
    return await this.recipeService.findOne(id);
  }

  @Mutation(() => RecipeDTO)
  async deleteRecipe(
    @Args('data') deleteRecipeDto: DeleteRecipeDto,
  ): Promise<RecipeDTO> {
    return await this.recipeService.remove(deleteRecipeDto);
  }

  @Mutation(() => RecipeDTO)
  async deleteRecipes(
    @Args('data') deleteRecipesDto: DeleteRecipesDto,
  ): Promise<RecipeDTO[]> {
    return await this.recipeService.removeMany(deleteRecipesDto);
  }
}
