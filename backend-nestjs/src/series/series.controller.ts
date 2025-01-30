import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query
} from '@nestjs/common';
import {SerieService} from "./service/serie/serie.service";
import {SerieDto} from "./dto/serie.dto/serie.dto";

@Controller('api/v1/ProyectoBelda')
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
            if (e instanceof NotFoundException){
                throw e
            }
            throw new InternalServerErrorException({
                status:'Error',
                message:e.message
            })
        }
    }

    @Get('byName')
    async getSerieByName(@Query('name')name:string){
        try {
            return await this.serieService.getSerieByName(name);
        }catch (e:any){
            throw new InternalServerErrorException({
                status:"Error",
                message:e.message
            })
        }
    }

    @Put('/:id')
    async updateSerie(@Param('id')id:string,@Body()serieDto:SerieDto){
        try {
            const updateSerie=
                await this.serieService.updateSerie(
                    id,serieDto
                );
            if (!updateSerie){
                throw new NotFoundException({
                    status:"Error",
                    message:"No encontrada"
                })
            }
            return{
                status:"Ok",
                message:"Serie actualizada"
            }
        }catch (e:any){
            if (e instanceof NotFoundException){
                throw e
            }
            throw new InternalServerErrorException({
                status:"Error",
                message:e.message
            })
        }

    }

    @Delete('/:id')
    async deleteSerie(@Param('id')id:string){
        const deleteSerie=await this.serieService.deleteSerie(id);
        if (!deleteSerie){
            throw new NotFoundException({
                status:"Error",
                message:"No encontrada"
            })
        }
        return{
            status:"Ok",
            message:"Serrie borrada"
        }

    }catch (e:any){
        if (e instanceof NotFoundException){
            throw e
        }
        throw new InternalServerErrorException({
            status:"Error",
            message:e.message
        })
    }


    @Get('categorias')
    async getCategorias() {
        try {
            const categorias = await this.serieService.getCategorias();
            console.log(categorias)
            return {
                status: 'ok',
                data: categorias
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: "Error",
                message: e.message
            });
        }
    }


    @Get('search')
    async getSerieByTitleOrSynopsis(@Query('query') query: string) {
        try {
            const series = await this.serieService.getSerieByTitleOrSynopsis(query);
            return {
                status: 'ok',
                data: series
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: "Error",
                message: e.message
            });
        }
    }




}


