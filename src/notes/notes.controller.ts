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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('create')
  create(@Res() res: Response) {
    return res.render('notes/create');
  }

  @Post()
  store(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const notes = await this.notesService.findAll();
    const result = {
      notes,
    };

    return res.render('index', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    // return this.notesService.findOne(+id);
    const note = await this.notesService.findOne(+id);
    if (!note) {
      // return res.status(404).json({ code: '404', msg: 'Resource Not Found!' });
      return res.render('errors/404');
    }

    return res.render('notes/show', { note });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
