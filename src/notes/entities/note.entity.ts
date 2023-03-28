import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @ManyToOne(() => Category, (category: Category) => category.notes)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;
}
