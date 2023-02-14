import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModel } from './entities/car-model.entity';
import { CarBrandModule } from 'src/car-brand/car-brand.module';

@Module({
  controllers: [CarModelController],
  providers: [CarModelService],
  imports: [TypeOrmModule.forFeature([CarModel]), CarBrandModule],
  exports: [CarModelService],
})
export class CarModelModule {}
