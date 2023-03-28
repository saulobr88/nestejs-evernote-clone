import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const title: string = this.categoriesService.getHello();
    const categories = await this.categoriesService.findAll();
    const result = { title, categories };

    // return this.categoriesService.findAll();
    // return res.json(result);
    return res.render('categories/index', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      // return res.status(404).json({ code: '404', msg: 'Resource Not Found!' });
      return res.render('errors/404');
    }

    return res.render('categories/show', { category });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
