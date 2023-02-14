import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { CarModel } from './entities/car-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarBrandService } from 'src/car-brand/car-brand.service';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel) private repo: Repository<CarModel>,
    private carBrandService: CarBrandService,
  ) {}
  async create(data: CreateCarModelDto) {
    const brand = await this.carBrandService.findOne(data.brandId);
    if (!brand) throw new BadRequestException('not valid brand!');
    const model = this.repo.create(data);
    model.brand = brand;
    return this.repo.save(model);
  }

  findAll() {
    return this.repo.findAndCount();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateCarModelDto: UpdateCarModelDto) {
    const model = await this.findOne(id);
    if (!model) throw new NotFoundException('no such amodel found');
    model.model = updateCarModelDto.model;
    return this.repo.save(model);
  }

  async remove(id: number) {
    const model = await this.findOne(id);
    if (!model) throw new NotFoundException('no such amodel found');
    return this.repo.softRemove(model);
  }
}
