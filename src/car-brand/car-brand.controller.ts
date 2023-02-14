import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CarBrandService } from './car-brand.service';
import { CreateCarBrandDto } from './dto/create-car-brand.dto';
import { UpdateCarBrandDto } from './dto/update-car-brand.dto';

@Controller('car-brands')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createCarBrandDto: CreateCarBrandDto) {
    return this.carBrandService.create(createCarBrandDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.carBrandService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.carBrandService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCarBrandDto: UpdateCarBrandDto,
  ) {
    return this.carBrandService.update(id, updateCarBrandDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.carBrandService.remove(id);
  }
}
