import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperServiceService } from './scraper/scraper.service';

@Module({
  imports: [RecipeModule],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperServiceService],
})
export class AppModule {}
