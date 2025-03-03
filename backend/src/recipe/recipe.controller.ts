import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { ScraperService } from 'src/scraper/scraper.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly scraperService: ScraperService,
  ) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    const recipe = this.scraperService.scrapeRecipe(createRecipeDto.url);
    return recipe;
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recipeService.remove(+id);
  // }
}
