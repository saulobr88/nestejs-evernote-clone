import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Note } from 'src/notes/entities/note.entity';
import { NotesService } from 'src/notes/notes.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { HomeController } from './home.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag, Category])],
  controllers: [HomeController],
  providers: [NotesService, TagsService, CategoriesService],
})
export class HomeModule {}
