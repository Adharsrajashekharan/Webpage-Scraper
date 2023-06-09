const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app=express()
const urlRoutes=require('./routers/urlRoutes')




app.use(express.json())
mongoose.connect("mongodb+srv://Adhars:Adhars1998@cluster0.fjkxciz.mongodb.net/growth").then(()=>console.log("Db connected")).catch(()=>console.log("error in db"))
app.use(cors())
app.use('/',urlRoutes)
app.listen(5000,()=>console.log("listening on 5000"))