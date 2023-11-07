const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cardEntryModel = require('./entry-schema.js')
const mongoose = require('mongoose')



mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mmmr860.mongodb.net<dbname>/bank?retryWrites=true&w=majority")
    .then(()=>
        console.log('conectado')
    )
    .catch(()=>
        console.log('no conectado')
    )

let cuentasBancarias = []
app.use(bodyParser.json())
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

app.get('/card',(req,res,next)=>{
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


app.use('/bank', (req,res,next)=>{
    cardEntryModel.find()
    .then((data)=>{
        cuentasBancarias = data
        res.json({'cuentasBancarias':cuentasBancarias})
    })
})

module.exports = app

