const mongoose = require('mongoose');
const {Schema} = mongoose;

const serieSchema = new Schema({
    titulo: {type:String,required:true},
    categoria: {type:String,required:true},
    imagenes: {type:String,required:true},
    capitulos: {type:Number,required:true},
    emision: {type:String,required:true},
    sinopsis: {type:String,required:true},

})


module.exports= mongoose.model('Serie',serieSchema,'ProyectoBelda');