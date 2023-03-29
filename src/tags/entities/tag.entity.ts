import { Note } from 'src/notes/entities/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  // Relations
  @ManyToMany(() => Note, (note: Note) => note.tags, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  notes?: Note[];
}
