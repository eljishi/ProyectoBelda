import {IsNumber, IsOptional, Min, MIN} from "class-validator";
import {Type} from "class-transformer";

export class PaginatioDto{
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    @Min(1)
    page?:number=1

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    @Min(1)
    limit?:number=10;


}