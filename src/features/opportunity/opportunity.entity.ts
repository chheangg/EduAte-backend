import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
