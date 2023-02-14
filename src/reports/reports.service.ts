import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModelService } from 'src/car-model/car-model.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
    private modelService: CarModelService,
  ) {}

  async create(data: CreateReportDto, user: User) {
    const model = await this.modelService.findOne(data.modelId);
    if (!model) throw new BadRequestException('not valid model_id');
    const report = this.repo.create(data);
    report.user = user;
    report.model = model;
    return this.repo.save(report);
  }

  async approve(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) throw new NotFoundException('no such a user found!');
    report.approved = approved;
    return this.repo.save(report);
  }

  async getUserReports(user: User) {
    const reports = await this.repo.findBy({ user });
    return reports;
  }
}
