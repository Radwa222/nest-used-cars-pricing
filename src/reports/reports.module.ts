import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { CarModelModule } from 'src/car-model/car-model.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [TypeOrmModule.forFeature([Report]), CarModelModule, UsersModule],
})
export class ReportsModule {}
