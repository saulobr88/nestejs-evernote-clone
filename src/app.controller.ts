import { Controller, Get, Next, Param, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (!Number.isInteger(id)) next();

    const note = await this.notesService.findOne(+id);
    if (!note) {
      // return res.status(404).json({ code: '404', msg: 'Resource Not Found!' });
      return res.render('errors/404');
    }

    return res.render('notes/show', { note });
  }
  */

  /*
  @Get()
  async index(@Res() res: Response) {
    const notes = await this.notesService.findAll();
    const result = {
      notes,
    };

    return res.render('index', result);
  }
  */
  getHello() {
    return this.appService.getHello();
  }
}
