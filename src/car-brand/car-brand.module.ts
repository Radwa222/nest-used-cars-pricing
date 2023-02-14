import { Module } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CarBrandController } from './car-brand.controller';
import { CarBrand, CarBrandSchema } from './car-brand.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService],
  imports: [
    MongooseModule.forFeature([
      { name: CarBrand.name, schema: CarBrandSchema },
    ]),
  ],
  exports: [CarBrandService],
})
export class CarBrandModule {}
