import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModelModule } from 'src/car-model/car-model.module';
import { UsersModule } from 'src/users/users.module';
import { Report, ReportSchema } from './report.schema';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    CarModelModule,
    UsersModule,
  ],
})
export class ReportsModule {}
