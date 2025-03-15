import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { ScraperService } from 'src/scraper/scraper.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { RecipeService } from './recipe.service';
import { RecipeDocument } from 'src/schemas/recipe.schema';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly scraperService: ScraperService,
  ) {}

  @Post()
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    const recipe = await this.scraperService.scrapeRecipe(createRecipeDto.url);
    if (!recipe) {
      throw new BadRequestException('Failed to scrape recipe');
    }
    return this.recipeService.create(recipe);
  }

  @Get()
  async findAll(): Promise<RecipeDocument[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeDocument> {
    const recipe = await this.recipeService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean; message: string }> {
    return this.recipeService.remove(id);
  }
}
