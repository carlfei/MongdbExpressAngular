const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const cors = require('cors');
const cardEntryModel = require('./entry-schema.js')
const mongoose = require('mongoose')



mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mmmr860.mongodb.net/<dbname>?retryWrites=true&w=majority")
    .then(()=>
        console.log('conectado')
    )
    .catch(()=>
        console.log('no conectado')
    )

let cuentasBancarias = []
app.use(bodyParser.json())
//app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Corregido el espacio en blanco entre POST y PUT
    next();
});

app.post('/addcard', (req,res)=>{
    try{
    const cardEntry = new cardEntryModel({
        titular: req.body.titular,
        numeroTarjeta:req.body.numeroTarjeta,
        fechaCaducidad: req.body.fechaCaducidad,
        cvv: req.body.cvv,
        fechaCreacion: new Date()
    })
    cardEntry.save()
    cuentasBancarias.push(cardEntry)
    res.status(200).json({
        message:'Post Submited'
    })
} catch (error){
    res.send('error: \n'+error)
}
});

app.get('/cards',(req,res,next)=>{
cardEntryModel.find()
    .then((data)=>{
        cuentasBancarias = data
        res.json({'cards':data})
    })
    .catch((error)=>{
        console.log('Error with cards')
        res.send('Error: \n'+error)
    })
})

app.delete('/remove-card/:id',(req,res)=>{
    cardEntryModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status(200).json({
            message: 'Post delete'
        })
    })
  /*
    .catch((error)=>{
        res.status(403).send('Error: \n '+error)
    })
*/

});

app.put('/update-entry/:card',(req,res)=>{
    const updateEntry = new cardEntryModel({
        _id:req.body._id,
        titular:req.body.titular,
        numeroTarjeta:req.body.numeroTarjeta,
        fechaCaducidad:req.body.fechaCaducidad,
        //fechaCreacion:req.body.fechaCreacion,
        cvv:req.body.cvv,
        fechaCreacion:new Date()
    })
    cardEntryModel.updateOne({_id:req.body._id},updateEntry)
    .then(()=>{
        res.status(200).json({
            message: 'Update ok'
        })
    })
    .catch((error)=>{
        res.status(403).send('Error: \n '+error)
    })
})

app.use('/bank', (req,res,next)=>{
    cardEntryModel.find()
    .then((data)=>{
        cuentasBancarias = data
        res.json({'cuentasBancarias':cuentasBancarias})
    })
})

module.exports = app

