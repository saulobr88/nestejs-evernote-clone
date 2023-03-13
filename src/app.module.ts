import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [CategoriesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
