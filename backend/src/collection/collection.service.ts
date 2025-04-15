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

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>,
  ) {}

  async create(createCollection: CreateCollectionDto): Promise<CollectionDTO> {
    const collectionToCreate = new this.collectionModel(createCollection);
    const createdCollection = await collectionToCreate.save();
    return toCollectionDTO(createdCollection);
  }

  async updateCollection(
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionDTO> {
    const collectionToCreate = new this.collectionModel(updateCollectionDto);
    const createdCollection = await collectionToCreate.save();
    return toCollectionDTO(createdCollection);
  }

  async addToCollection(
    addToCollectionDto: AddToCollectionDto,
  ): Promise<CollectionDTO> {
    const collectionToCreate = new this.collectionModel(addToCollectionDto);
    const createdCollection = await collectionToCreate.save();
    return toCollectionDTO(createdCollection);
  }

  async findAll(search?: string): Promise<CollectionDTO[]> {
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const collections = await this.collectionModel
      .find(filter)
      .sort({ _id: -1 })
      .exec();

    return collections.map((r) => toCollectionDTO(r));
  }

  async findOne(id: string): Promise<CollectionDTO> {
    const collection = await this.collectionModel.findById(id).exec();
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
      .exec();
    if (!collection) {
      throw new NotFoundException(
        `Collection with ID ${deleteCollectionDto.id} not found`,
      );
    }
    return toCollectionDTO(collection);
  }
}
