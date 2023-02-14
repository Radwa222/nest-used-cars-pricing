import { CarModel } from 'src/car-model/entities/car-model.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  lat: number;
  @Column()
  long: number;
  @ManyToOne(() => CarModel, (model) => model.reports, { nullable: false })
  model: CarModel;
  @Column()
  millage: number;
  @Column()
  year: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
