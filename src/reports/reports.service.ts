import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CarModelService } from 'src/car-model/car-model.service';
import { UserDocument } from 'src/users/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report, ReporttDocument } from './report.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly model: Model<ReporttDocument>,
    private modelService: CarModelService,
  ) {}

  async create(data: CreateReportDto, user) {
    const isModel = await this.modelService.findOne(data.modelId);
    if (!isModel) throw new BadRequestException('not valid model_id');
    const report = new this.model(data);
    report.user = user;
    report.model = isModel;
    return report.save();
  }

  async approve(id: number, approved: boolean) {
    const report = await this.model.findById(id);
    if (!report) throw new NotFoundException('no such a user found!');
    report.approved = approved;
    return report.save();
  }

  async getUserReports(user: UserDocument) {
    return this.model.find({ user: user._id }).populate('user');
  }
}
