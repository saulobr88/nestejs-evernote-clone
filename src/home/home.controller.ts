import {
  Controller,
  DefaultValuePipe,
  Get,
  Next,
  Param,
  ParseIntPipe,
  Query,
  Res,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';

import { NotesService } from 'src/notes/notes.service';
import { CategoriesService } from 'src/categories/categories.service';
import { TagsService } from 'src/tags/tags.service';

@Controller()
export class HomeController {
  constructor(
    private readonly notesService: NotesService,
    private readonly categoriesService: CategoriesService,
    private readonly tagsService: TagsService,
  ) {}

  @Get('/create')
  async create(@Res() res: Response) {
    const categories = await this.categoriesService.findAll();
    const tags = await this.tagsService.findAll();
    return res.render('notes/create', { categories, tags });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (!Number.isInteger(+id)) {
      // next();
      return res.render('errors/404');
      /*
      return res.json({
        isNumber: Number.isInteger(id),
        typeof: typeof id,
        value: id,
      });
      */
    }

    const note = await this.notesService.findOne(+id);
    if (!note) {
      // return res.status(404).json({ code: '404', msg: 'Resource Not Found!' });
      return res.render('errors/404');
    }

    return res.render('notes/show', { note });
  }

  @Get(':id/edit')
  async editOne(@Param('id') id: string, @Res() res: Response) {
    if (!Number.isInteger(+id)) {
      // next();
      return res.render('errors/404');
      /*
      return res.json({
        isNumber: Number.isInteger(id),
        typeof: typeof id,
        value: id,
      });
      */
    }

    const note = await this.notesService.findOne(+id);
    if (!note) {
      // return res.status(404).json({ code: '404', msg: 'Resource Not Found!' });
      return res.render('errors/404');
    }

    const categories = await this.categoriesService.findAll();
    const tags = await this.tagsService.findAll();

    return res.render('notes/edit', { note, categories, tags });
  }

  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(4), ParseIntPipe) limit = 4,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    limit = limit > 100 ? 100 : limit;
    page = page < 1 ? 1 : page;
    // const notes = await this.notesService.findAll();
    const paginateOptions = {
      page,
      limit,
      route: `${req.protocol}://${req.headers.host}`,
    };

    // return res.json(paginateOptions);
    const notesPaginate = await this.notesService.paginate(paginateOptions);
    const notes = await this.notesService.hydrate(notesPaginate);
    const result = {
      notes,
    };
    // return res.json(result);
    return res.render('index', result);
  }
}
