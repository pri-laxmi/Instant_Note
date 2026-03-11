const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/notes-extension')
.then(e=>console.log('mongodb connected'));
const cors = require('cors');
app.use(cors());
app.use(express.json());

const thoughtRoutes=require('./routes/thought-routes');
app.use(thoughtRoutes);

const port=8000;
app.listen(port,()=>console.log(`server started at port ${port}`));