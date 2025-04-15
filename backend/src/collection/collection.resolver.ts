import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CollectionDTO } from 'src/collection/dto/collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { CollectionService } from './collection.service';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AddToCollectionDto } from './dto/add-to-collection.dto';

@Resolver(() => CollectionDTO)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Mutation(() => CollectionDTO)
  async createCollection(
    @Args('data') createCollectionDto: CreateCollectionDto,
  ): Promise<CollectionDTO> {
    return await this.collectionService.create(createCollectionDto);
  }

  @Query(() => [CollectionDTO])
  async getCollections(
    @Args('search', { nullable: true }) search?: string,
  ): Promise<CollectionDTO[]> {
    return this.collectionService.findAll(search);
  }

  @Query(() => CollectionDTO)
  async getCollection(@Args('id') id: string): Promise<CollectionDTO> {
    return await this.collectionService.findOne(id);
  }

  @Mutation(() => CollectionDTO)
  async updateCollection(
    @Args('data') updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionDTO> {
    return await this.collectionService.updateCollection(updateCollectionDto);
  }

  @Mutation(() => CollectionDTO)
  async addToCollection(
    @Args('data') addToCollectionDto: AddToCollectionDto,
  ): Promise<CollectionDTO> {
    return await this.collectionService.addToCollection(addToCollectionDto);
  }

  @Mutation(() => CollectionDTO)
  async deleteCollection(
    @Args('data') deleteCollectionDto: DeleteCollectionDto,
  ): Promise<CollectionDTO> {
    return await this.collectionService.remove(deleteCollectionDto);
  }
}
