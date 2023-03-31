export class CreateNoteDto {
  title: string;
  body: string;
  categoryId: number;
  tags?: number[];
}
