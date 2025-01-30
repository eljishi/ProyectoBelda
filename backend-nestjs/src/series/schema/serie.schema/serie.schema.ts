import {Schema} from "mongoose";

export const SerieSchema = new Schema({
    titulo: {type:String,required:true},
    categorias: [{type:String,required:true}],
    imagenes: [{type:String,required:true}],
    capitulos: {type:Number,required:true},
    emision: {type:String,required:true},
    sinopsis: {type:String,required:true},

})
