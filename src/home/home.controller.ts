import {
  Controller,
  Get,
  Next,
  Param,
  Res,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

import { NotesService } from 'src/notes/notes.service';
import { CategoriesService } from 'src/categories/categories.service';
import { TagsService } from 'src/tags/tags.service';

import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

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
  async index(@Req() req: Request, @Res() res: Response) {
    const notes = await this.notesService.findAll();
    const result = {
      notes,
    };

    // res.flash('success_msg', 'Mensagem de Sucesso aqui');
    // res.flash('error_msg', 'Mensagem de Erro aqui');
    return res.render('index', result);
    /*
    req.session.save(() => {
      return res.render('index', result);
    });
    */
  }
}
