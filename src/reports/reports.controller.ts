import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../common/interceptors/serialize-interceptor';
import { ReportDTO } from './dtos/report.dto';
import { ApproveReportDTO } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @Serialize(ReportDTO)
  create(@Body() body: CreateReportDto, @Request() req) {
    return this.reportService.create(body, req.user);
  }

  @Patch('approve/:id')
  @Serialize(ReportDTO)
  approve(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportService.approve(+id, body.approved);
  }

  @Get('/user')
  getUserReports(@Req() req) {
    return this.reportService.getUserReports(req.user);
  }
}
