import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    const { tags: _, ...newNote } = createNoteDto;
    return this.notesRepository.save(this.notesRepository.create(newNote));
  }

  async syncTags(note: Note, tags: number[]) {
    const tagsArray = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
    note.tags = [];
    await this.notesRepository.save(note);
    note.tags = tagsArray;

    return this.notesRepository.save(note);
  }

  findAll() {
    return this.notesRepository.find({
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.notesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const { tags: _, ...notePayload } = updateNoteDto;
    const preloadModel = await this.notesRepository.preload({
      id,
      ...notePayload,
    });
    const updatedModel = await this.notesRepository.save(preloadModel);
    return updatedModel;
  }

  async remove(id: number) {
    const note = await this.notesRepository.findOne({
      where: { id },
    });
    if (!note) {
      return false;
    }

    const result = await this.notesRepository.remove(note);
    if (result) {
      return true;
    }

    return false;
  }
}
