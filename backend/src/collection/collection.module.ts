import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ScraperService } from 'src/scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collection/collection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  providers: [CollectionService, ScraperService],
})
export class CollectionModule {}
