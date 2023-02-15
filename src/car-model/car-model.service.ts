import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { CarModel, CarModelDocument } from './car-model.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CarBrandService } from 'src/car-brand/car-brand.service';
import { Model } from 'mongoose';

@Injectable()
export class CarModelService {
  constructor(
    @InjectModel(CarModel.name)
    private readonly model: Model<CarModelDocument>,
    private carBrandService: CarBrandService,
  ) {}
  async create(data: CreateCarModelDto) {
    const brand = await this.carBrandService.findOne(data.brandId);
    if (!brand) throw new BadRequestException('not valid brand!');
    const model = new this.model(data);
    model.brand = brand;
    return model.save();
  }

  findAll() {
    return this.model.find().populate('brand').exec();
  }

  async findOne(id) {
    const model = await this.model.findOne({ _id: id });
    if (!model) throw new BadRequestException('no suach a car brand');
    return model;
  }

  async update(id: string, updateCarModelDto: UpdateCarModelDto) {
    const model = await this.findOne(id);
    if (!model) throw new NotFoundException('no such amodel found');
    model.model = updateCarModelDto.model;
    return model.save();
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    if (!model) throw new NotFoundException('no such a model found');
    return model.remove();
  }
}
