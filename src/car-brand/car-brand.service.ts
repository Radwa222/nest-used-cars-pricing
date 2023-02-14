import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { UpdateCarBrandDto } from './dto/update-car-brand.dto';
import { CarBrand } from './entities/car-brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarBrandService {
  constructor(@InjectRepository(CarBrand) private repo: Repository<CarBrand>) {}
  async create(createCarBrandDto: CreateCarBrandDto) {
    const isExisting = await this.findByName(createCarBrandDto.name);
    if (isExisting)
      throw new BadRequestException('this car brand is already exists');
    const brand = this.repo.create(createCarBrandDto);
    return this.repo.save(brand);
  }

  findAll() {
    return this.repo.findAndCount();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, { name }: UpdateCarBrandDto) {
    const brand = await this.findOne(id);
    if (!brand) return null;
    brand.name = name;
    return this.repo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    if (!brand) return null;
    return this.repo.softRemove(brand);
  }
  findByName(name: string) {
    return this.repo.findOneBy({ name });
  }
}
