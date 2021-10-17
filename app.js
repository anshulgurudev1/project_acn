const express =require('express');
const app=express();
const mongoose =require('mongoose');
const {MONGOURI} = require('./key.js');
const bcrypt=require('bcryptjs')
const port =5000;


mongoose.connect(MONGOURI,{useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{
    console.log("connected sucessfully");
})
mongoose.connection.on('error',(err)=>{
    console.log("disconnected",err);
})
app.use(express.json())
require('./models/user');

app.use(require('./routes/auth'))



app.listen(port,()=>{
    console.log('server running ')
})  