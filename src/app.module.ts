import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { NotesModule } from './notes/notes.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoriesModule,
    TagsModule,
    NotesModule,
    HomeModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
