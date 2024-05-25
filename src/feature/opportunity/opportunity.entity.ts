import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Opportunity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column({ type: 'boolean', default: false })
  isInternational: boolean;

  @ManyToOne(() => Category, (category) => category.opportunities)
  category: Category;
}
