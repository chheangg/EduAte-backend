import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Opportunity } from '../opportunity/opportunity.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Opportunity, (opportunity) => opportunity.category)
  opportunities: Opportunity[];
}
