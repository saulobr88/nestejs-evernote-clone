import { Note } from 'src/notes/entities/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
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
  @OneToMany(() => Note, (note: Note) => note.category)
  @JoinColumn({ referencedColumnName: 'category_id' })
  notes: Note[];
}
