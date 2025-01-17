const Serie = require('../models/series.models');

const seriesCtrl= {};

seriesCtrl.getSeries = async(req, res) =>{
    const series=await Serie.find().then((data)=>{
        res.status(200).json({
            status:"Encontradas todas",
            data:data
        });
    })
        .catch(err=>{
            res.status(400).json({error:"nao nao", message:err.message});
            console.error(err);

        });
}


seriesCtrl.getSerie=async(req, res) =>{
    const series=await Serie.findById(req.params.id).then((data)=>{
        if(data)res.status(200).json({
            status:"Encontrada",
            data:data
        })
            else res.status(404).json({status:"no encontrado",
        message:"serie no encontrada"})
    })
        .catch(err=>{
            res.status(400).json({status:"serie no encontrada",
            message:err.message})
        })
    console.error(err);
}

seriesCtrl.addSerie=async(req, res) =>{
    const miSerie= new Serie(req.body);
    await miSerie.save().then(data=>{
        res.status(201).json({
            status:"ok",
            message:"serie añadida correctamente",
        });
    }).catch(err=>{res.status(400).json({status:"error",message:err.message})})
}

seriesCtrl.updateSerie = async (req, res) => {
    try {
        const serie = req.body; // Datos del cuerpo de la petición
        const id = req.params.id; // ID del parámetro de la URL

        // Actualizar la serie
        const updatedSerie = await Serie.findByIdAndUpdate(
            id,
            { $set: serie },
            { new: true } // Devuelve el documento actualizado
        );

        // Verificar si se encontró la serie
        if (updatedSerie) {
            return res.status(200).json({
                status: "Actualizada correctamente",
                message: "Actualizada correctamente",
                data: updatedSerie, // Puedes incluir los datos actualizados si es necesario
            });
        } else {
            return res.status(404).json({
                status: "No encontrado",
                message: "Serie no encontrada",
            });
        }
    } catch (err) {
        // Manejar errores
        console.error(err);
        return res.status(400).json({
            status: "Error",
            message: err.message,
        });
    }



}

seriesCtrl.deleteSerie=async(req, res) =>{
    await Serie.findByIdAndDelete(req.params.id)
        .then((data)=>{
            if(data)res.status(200).json({
                status:"Borrada",message:"serie borrada correctamente"
            })
            else res.status(404).json({status:"no encontrado"
            })
                .catch(err=>{res.status(400).json({
                    status:"error",
                    message:err.message
                })
                    console.error(err);
                })



})
}

seriesCtrl.getCategorias=async(req, res) =>{
    await Serie.find().distinct('categoria').then((data)=>{
        res.status(200).json({
            status:"ok",
            data
        })
    })
        .catch(err=>{res.status(400).json({status:"error",message:err.message})
        console.error(err);
        })
}


module.exports = seriesCtrl;