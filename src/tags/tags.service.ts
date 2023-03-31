import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findAll() {
    return this.tagsRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
      relations: {
        notes: true,
      },
    });
  }

  findOne(id: number) {
    return this.tagsRepository.findOne({
      where: { id },
      relations: ['notes'],
      order: {
        notes: {
          createdAt: 'DESC',
        },
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  getHello(): string {
    return 'Etiquetas';
  }
}
