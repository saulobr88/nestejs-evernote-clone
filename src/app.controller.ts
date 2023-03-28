import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response) {
    const message: string = this.appService.getHello();
    return res.render('index', { message });
  }

  @Get('create')
  create(@Res() res: Response) {
    return res.render('notes/create.njk');
  }
}
