import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Request,
  Get,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize-interceptor';
import { ReportDTO } from './dtos/report.dto';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @Roles(Role.User)
  @Serialize(ReportDTO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() body: CreateReportDto, @Request() req) {
    return this.reportService.create(body, req.user);
  }

  @Patch('approve/:id')
  @Roles(Role.Admin)
  @Serialize(ReportDTO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportService.approve(+id, body.approved);
  }

  @Get('/user')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUserReports(@Request() req) {
    return this.reportService.getUserReports(req.user);
  }
}
