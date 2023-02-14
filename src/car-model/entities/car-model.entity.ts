import { CarBrand } from 'src/car-brand/entities/car-brand.entity';
import { Report } from 'src/reports/reports.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  @ManyToOne(() => CarBrand, (brand) => brand.models, { nullable: false })
  brand: CarBrand;

  @OneToMany(() => Report, (report) => report.model, { nullable: false })
  reports: Report[];
}
