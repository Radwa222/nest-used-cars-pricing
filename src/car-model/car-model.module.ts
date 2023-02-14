import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModel, CarModelSchema } from './car-model.schema';
import { CarBrandModule } from 'src/car-brand/car-brand.module';

@Module({
  controllers: [CarModelController],
  providers: [CarModelService],
  imports: [
    MongooseModule.forFeature([
      { name: CarModel.name, schema: CarModelSchema },
    ]),
    CarBrandModule,
  ],
  exports: [CarModelService],
})
export class CarModelModule {}
