import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperService } from './scraper/scraper.service';

@Module({
  imports: [RecipeModule],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
