import { Module, MiddlewareConsumer } from '@nestjs/common';
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
import * as methodOverride from 'method-override';

import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoriesModule,
    TagsModule,
    NotesModule,
    /**
     * Ref.: how to get serve static images Nestjs < https://stackoverflow.com/questions/68019001/how-to-get-serve-static-images-nestjs >
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
      serveRoot: '/assets/', //last slash was important
    }),
    HomeModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(trim_all).forRoutes('*');
    // override with POST having ?_method=DELETE Or ?_method=PUT
    consumer.apply(methodOverride('_method')).forRoutes('*');
    /*
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
    consumer.apply(flash()).forRoutes('*');
    */
    consumer.apply(LoggerMiddleware).exclude('auth').forRoutes('*');
  }
}
