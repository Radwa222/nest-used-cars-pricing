import { Role } from '../enums/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  frist_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  is_admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Admin,
  })
  role: Role;
}
