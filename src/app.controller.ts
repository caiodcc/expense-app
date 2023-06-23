import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid'
import { CreateReportDto, reportResponseDto, updateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService){

  }

  @Get()

  getAllIncomeReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): reportResponseDto[]{

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllReports(reportType);
  }


  @Get(':id')
  getIncomeReport(
    @Param('type',new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string): reportResponseDto {

    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById(reportType, id)

  
  }

  @Post()
  createReport(
    @Body() { amount, source} :  CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string 
  ): reportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source})
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.deleteReport(id)
  }

  @Put(':id')
  editReport(
    // Param() is about receiving data from the header request to find the exact object
    // Body() is about receving the content which is the data to use on the request
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body : updateReportDto,

  ): reportResponseDto  
  {
  const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
  
  return this.appService.updateReport(reportType, id, body)
}}
