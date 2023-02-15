import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { UpdateCarBrandDto } from './dto/update-car-brand.dto';
import { Model } from 'mongoose';
import { CarBrandDocument, CarBrand } from './car-brand.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarBrandService {
  constructor(
    @InjectModel(CarBrand.name)
    private readonly model: Model<CarBrandDocument>,
  ) {}
  async create(createCarBrandDto: CreateCarBrandDto) {
    const isExisting = await this.findByName(createCarBrandDto.name);
    if (isExisting)
      throw new BadRequestException('this car brand is already exists');
    const brand = new this.model(createCarBrandDto);
    return brand.save();
  }

  findAll() {
    return this.model.find().populate('models').exec();
  }

  async findOne(id) {
    const brand = await this.model.findById({ _id: id }).exec();
    if (!brand) throw new BadRequestException('no suach a car brand');
    return brand;
  }

  async update(id: string, { name }: UpdateCarBrandDto) {
    const brand = await this.findOne(id);
    if (!brand) return null;
    brand.name = name;
    return brand.save();
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    if (!brand) return null;
    return brand.remove();
  }
  findByName(name: string) {
    return this.model.findOne({ name });
  }
}
