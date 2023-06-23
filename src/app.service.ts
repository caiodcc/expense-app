import { ReportType, data } from "src/data"
import { Injectable } from "@nestjs/common"
import { v4 as uuid } from 'uuid'
import { reportResponseDto } from "./dtos/report.dto";

interface Report { amount: number, source: string }
interface updateReport { amount?: number, source?: string }
@Injectable()
export class AppService {

   getAllReports(type: ReportType): reportResponseDto[] {
      return data.report.filter((report) => report.type === type).map(report => new reportResponseDto(report))
   }

   getReportById(type: ReportType, id: string): reportResponseDto {
      const report =  data.report.filter((report) => report.type === type).find((report) => report.id === id);

      if(!report) return;

      return new reportResponseDto(report);
   }

   createReport(type: ReportType, { amount, source }: Report): reportResponseDto {
      const newReport = {
         id: uuid(),
         source,
         amount,
         created_at: new Date(),
         updated_at: new Date(),
         type
      };

      data.report.push(newReport)
      return new reportResponseDto(newReport);
   }

   updateReport(type: ReportType, id: string, body: updateReport): reportResponseDto {

      
      // Filtering for type and ID received in header
      const report = data.report.filter((report) => report.type === type).find((report) => report.id === id)
      // Checking if the report exists
      if (!report) return;
      // Finding the position of the report (object) in the array of objects in the object 'Data'
      // so we can use it to update
      const reportIndex = data.report.findIndex((report) => report.id === id)

      // Merging the array how it was before with the new data received on the body
      data.report[reportIndex] = {
         ...data.report[reportIndex],
         ...body,
         updated_at: new Date()
      }
      return new reportResponseDto(data.report[reportIndex]);


   }
   deleteReport(id:string){
      const reportIndex = data.report.findIndex(report => report.id === id);

    if (reportIndex === -1) return;

    data.report.slice(reportIndex, 1)
  }

   }

