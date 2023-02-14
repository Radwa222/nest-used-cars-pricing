import { CarModel } from 'src/car-model/entities/car-model.entity';
import {
  DeleteDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';
@Entity()
export class CarBrand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => CarModel, (models) => models.brand, { nullable: false })
  models: CarModel[];
}
