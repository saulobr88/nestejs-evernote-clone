import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  // Relations
  @ManyToOne(() => Category, (category: Category) => category.notes, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToMany(() => Tag, (tag: Tag) => tag.notes, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinTable({
    name: 'note_tag',
    joinColumn: {
      name: 'note_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags?: Tag[];
}
