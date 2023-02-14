import { Module } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CarBrandController } from './car-brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from './entities/car-brand.entity';

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService],
  imports: [TypeOrmModule.forFeature([CarBrand])],
  exports: [CarBrandService],
})
export class CarBrandModule {}
