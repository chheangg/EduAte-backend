import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Opportunity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column({ type: 'boolean', default: false })
  isInternational: boolean;

  @ManyToOne(() => Category, (category) => category.opportunities)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Location, (location) => location.opportunities)
  @JoinColumn()
  location: Location;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
