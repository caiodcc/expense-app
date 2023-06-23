import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ReportType } from "src/data";

export class CreateReportDto {

    @IsNumber()
    @IsPositive()
    amount: number; 

    @IsString()
    @IsNotEmpty()
    source: string;

}

export class updateReportDto {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    amount: number; 

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    source: string;

}

export class reportResponseDto { 
    constructor(partial : Partial<reportResponseDto>){
        Object.assign(this, partial);

    }
    id: string; 
    source: string; 
    amount: number; 

    @Expose({name: 'createdAt'})
    transformCreatedAt(){
        return this.created_at;
    }

    @Exclude()
    created_at: Date; 

    @Exclude()
    updated_at: Date; 

    type: ReportType;


}