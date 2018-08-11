const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./server/routes')
const dbName= require('./server/dbname')

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${dbName}`);

console.log('check mongoose connection', mongoose.connection.readyState);

app.use(bodyParser.json())

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
    next()
})

routes(app) //calling routes


app.listen(port, ()=> console.log(`Listening on port ${port}`))