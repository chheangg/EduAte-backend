import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Roles {
  Admin = 'admin',
  Educator = 'educator',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.User })
  role: Roles;
}
