import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Serie} from "../../interface/serie/serie.interface";
import {SerieDto} from "../../dto/serie.dto/serie.dto";
import {Observable} from "rxjs";

@Injectable()
export class SerieService {
    constructor(@InjectModel('Serie')private serieModel:Model<Serie>) {
    }
    async addSerie(serieDto):Promise<any>{
        const serie =new this.serieModel(serieDto);
        return serie.save();
    }

    async getSeries(): Promise<Serie[]>{
        return this.serieModel.find()
    }

    async getSerie(idSerie:string):Promise<Serie>{
        return this.serieModel.findById(idSerie);
    }

    async getSerieByName(name:string):Promise<Serie[]>{
    const regex = new RegExp(name,'i');
    return this.serieModel.find(
        {
            title:{$regex:regex}
        }
    )
    }

    async updateSerie(id:string, serieDto:SerieDto):Promise<any>{
        return this.serieModel.findByIdAndUpdate(
            id,
            {$set:serieDto},
            {new:true}
        )
    }
    async deleteSerie(idSerie:string):Promise<any>{
        return this.serieModel.findByIdAndDelete(idSerie);
    }

    async getCategorias():Promise<string[]>{
        return this.serieModel.find().distinct('categorias')
    }

    getSerieByTitleOrSynopsis(searchTerm: string): Promise<any[]> {
        return this.serieModel.find({
            $or: [
                { titulo: { $regex: searchTerm, $options: 'i' } },
                { sinopsis: { $regex: searchTerm, $options: 'i' } }
            ]
        }).exec();
    }


}
