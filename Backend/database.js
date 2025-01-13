const mongoose = require('mongoose');

const URI ='mongodb+srv://damb:root@cluster.pnaq7.mongodb.net/ProyectoBelda?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(URI).then(()=>console.log('Base conectada')).catch(err=>{console.error(err.message)});

module.exports = mongoose;
