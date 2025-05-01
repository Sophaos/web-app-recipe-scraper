import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionDTO } from 'src/collection/dto/collection.dto';
import { toCollectionDTO } from './collection.helper';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { Collection, CollectionDocument } from './collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AddToCollectionDto } from './dto/add-to-collection.dto';
import { RecipeService } from 'src/recipe/recipe.service';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createCollection: CreateCollectionDto): Promise<CollectionDTO> {
    const { recipeIds, ...rest } = createCollection;

    const collectionToCreate = new this.collectionModel({
      ...rest,
      ...(recipeIds && { recipes: recipeIds }), // map recipeIds to recipes
    });
    const createdCollection = await collectionToCreate.save();
    const populatedCollection = await createdCollection.populate('recipes');
    return toCollectionDTO(populatedCollection);
  }

  async updateCollection(
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionDTO> {
    const { id, recipeIds, ...rest } = updateCollectionDto;

    const updatedCollection = await this.collectionModel
      .findByIdAndUpdate(
        id,
        {
          ...rest,
          ...(recipeIds && { recipes: recipeIds }), // Set recipes from recipeIds
        },
        { new: true },
      )
      .populate('recipes');

    if (!updatedCollection) {
      throw new Error('Collection not found');
    }

    return toCollectionDTO(updatedCollection);
  }

  async addToCollection(
    addToCollectionDto: AddToCollectionDto,
  ): Promise<CollectionDTO> {
    const { id, recipeId } = addToCollectionDto;

    const recipe = await this.recipeService.findOneRaw(recipeId);
    const updatedCollection = await this.collectionModel
      .findByIdAndUpdate(id, { $push: { recipes: recipe._id } }, { new: true })
      .populate('recipes');

    if (!updatedCollection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }

    return toCollectionDTO(updatedCollection);
  }

  async findAll(search?: string): Promise<CollectionDTO[]> {
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const collections = await this.collectionModel
      .find(filter)
      .sort({ _id: -1 })
      .populate('recipes')
      .exec();

    return collections.map((r) => toCollectionDTO(r));
  }

  async findOne(id: string): Promise<CollectionDTO> {
    const collection = await this.collectionModel
      .findById(id)
      .populate('recipes')
      .exec();
    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
    return toCollectionDTO(collection);
  }

  async remove(
    deleteCollectionDto: DeleteCollectionDto,
  ): Promise<CollectionDTO> {
    const collection = await this.collectionModel
      .findByIdAndDelete(deleteCollectionDto.id)
      .populate('recipes')
      .exec();
    if (!collection) {
      throw new NotFoundException(
        `Collection with ID ${deleteCollectionDto.id} not found`,
      );
    }
    return toCollectionDTO(collection);
  }
}
