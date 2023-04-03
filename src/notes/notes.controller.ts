import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
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
  async store(@Body() createNoteDto: CreateNoteDto, @Res() res: Response) {
    /*
    const msg = 'POST NoteController';
    return res.json({ createNoteDto, msg });
    */
    let note = await this.notesService.create(createNoteDto);
    if (!note) {
      return res.redirect(`/create?msg=error in creating note`);
    }

    if (createNoteDto.tags?.length > 0) {
      // Sincroniza as tags
      note = await this.notesService.syncTags(note, createNoteDto.tags);
    }

    // return 'note created successfully';
    return res.redirect(`/${note.id}?msg=note created successfully`);
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

  // @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Res() res: Response,
  ) {
    // return this.notesService.update(+id, updateNoteDto);
    // const msg = 'PATCH NoteController';
    // return res.json({ updateNoteDto, msg });
    let note = await this.notesService.update(+id, updateNoteDto);
    if (!note) {
      return res.redirect(`/${id}?msg=error updating note`);
    }

    if (updateNoteDto.tags?.length > 0) {
      // Sincroniza as tags
      note = await this.notesService.syncTags(note, updateNoteDto.tags);
    }

    // return 'note created successfully';
    return res.redirect(`/${note.id}?msg=note updated successfully`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    /*
    const msg = 'DELETE NoteController';
    return res.json({ msg, id });
    */
    const result = await this.notesService.remove(+id);
    if (!result) {
      return res.redirect(`/${id}?msg=error while deleting`);
    }

    return res.redirect(`/?msg=note deleted with successful`);
  }
}
