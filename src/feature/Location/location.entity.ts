import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opportunity } from '../opportunity/opportunity.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @OneToMany(() => Opportunity, (opportunity) => opportunity.location)
  opportunities: Opportunity[];
}
