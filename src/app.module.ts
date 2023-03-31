import { Module, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/database';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { NotesModule } from './notes/notes.module';
import { HomeModule } from './home/home.module';

import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { trim_all } from 'request_trimmer';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(trim_all).forRoutes('*');
    consumer.apply(LoggerMiddleware).exclude('auth').forRoutes('*');
  }
}
