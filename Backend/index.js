const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const {mongoose} = require('./database');
const {json} = require('express');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(json());

//app.use('/api/v1/series',require('./routes/series'));
app.use('/',(req,res)=>{res.status(404).json({status:"Endpoint no encontrado",
message:"La api esta en"});});

app.listen(app.get('port'), ()=>{console.log('Puerto:'+app.get('port'))});