import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { NotesModule } from './notes/notes.module';
import { NotesService } from './notes/notes.service';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoriesModule,
    TagsModule,
    NotesModule,
    TypeOrmModule.forFeature([Note]),
  ],
  controllers: [AppController],
  providers: [AppService, NotesService],
})
export class AppModule {}
