import {BadRequestException, Body, Controller, Get, NotFoundException, Param, Post} from '@nestjs/common';
import {SerieService} from "./service/serie/serie.service";
import {SerieDto} from "./dto/serie.dto/serie.dto";

@Controller('api/vi/ProyectoBelda')
export class SeriesController {
    constructor(private readonly serieService:SerieService) {
    }
    @Post('')
    async addSerie(@Body()serieDto:SerieDto){
        try {
            const resp=await this.serieService.addSerie(serieDto);
            return{
                status:'Ok',
                message:'Serie creada con exito'
            }
        }catch (e: any){
            throw new BadRequestException({status:'Error', message:e.message})
        }
    }

    @Get('')
    async getSeries(){
        try {
            const series=await this.serieService.getSeries();
            return{
                status:'ok',
                data:series
            }
        }catch (e:any){
            return new BadRequestException({
                status:'Error',
                message:e.message
            })
        }
    }
    @Get('serie/:id')
    async getSerie(@Param('id')id:string){
        try {
            const series=await this.serieService.getSeries();
            if (series){
                return{
                    status:'ok',
                    data:series
                }
            }
            return new NotFoundException({
                status:'Error',
                message:'Serie no encontrada'
            })

        }catch (e:any){
            return new BadRequestException({
                status:'Error',
                message:e.message
            })
        }
    }

}


